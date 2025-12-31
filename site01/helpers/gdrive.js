const
    config = require('config')
    axios = require('axios')

const { google } = require('googleapis')

let auth = null
if (config.embed)
    auth = new google.auth.GoogleAuth({
        keyFile: config.embed.google.keyFile,
        scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    })

async function getAccessToken() {
    if (auth) {
        const client = await auth.getClient()
        const tokens = await client.getAccessToken()

        return tokens.token
    }
    else 
        return null
}

function getId(url) {
    if (!url || typeof url !== 'string') {
        console.error("URL inválida fornecida.")
        return null
    }
    const regex = /(?:folders\/|folder\/|d\/)([-\w]{25,})/i
    const match = url.match(regex)
    if (match && match[1])
        return match[1]

    return null
}

exports.list = async (url) => {
    if(!url) return null
    
    const folderId = getId(url)
    const token = await getAccessToken()
    if (token) {
        const params = {
            q: `'${folderId}' in parents and trashed = false`,
            fields: "files(id, name, mimeType, modifiedTime, size, webContentLink, webViewLink, iconLink)"
        }
        const resp = await axios
            .get(
                "https://www.googleapis.com/drive/v3/files", {
                    params,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            .catch(err => {
                throw err
            })

        const withLinks = resp.data.files.map(item => {
            let action
            const IS_FOLDER = item.mimeType === 'application/vnd.google-apps.folder'
            if (IS_FOLDER)
                action = item.webViewLink || `https://drive.google.com/drive/folders/${item.id}`
            else if (item.webContentLink)
                action = item.webContentLink;
            else
                action = `https://drive.google.com/uc?export=download&id=${item.id}`;
            return {
                ...item,
                iconUrl: item.iconLink,
                downloadLink: action,
                isFolder: IS_FOLDER
            }
        })
        
        return withLinks
    }
    else
        return null
}
