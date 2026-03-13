const
    config = require('config')
    axios = require('axios')

const { google } = require('googleapis')

let auth = null
if (config.embed)
    auth = new google.auth.GoogleAuth({
        keyFile: config.embed.google.keyFile,
        scopes: ["https://www.googleapis.com/auth/drive.metadata.readonly"],
    })

async function getAccessToken() {
    if (auth) {
        try {
            const client = await auth.getClient()
            const tokens = await client.getAccessToken()

            return tokens.token
        } catch (e) {
            console.error(e)
            return null
        }
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
                console.error(err)
                throw err
            })

        const withLinks = resp.data.files.map(item => {
            let action
            const IS_FOLDER = item.mimeType === 'application/vnd.google-apps.folder'
            if (IS_FOLDER)
                action = item.webViewLink || `https://drive.google.com/drive/folders/${item.id}`
            else if (item.webContentLink)
                action = item.webContentLink
            else if (item.webViewLink)
                action = item.webViewLink
            else
                action = `https://drive.google.com/uc?export=download&id=${item.id}`
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

exports.translate = async (text, target = 'en', source = 'pt', format = 'html') => {
    if (!text) return null

    const token = await getAccessToken()
    if (!token) {
        console.error("Não foi possível obter o token de acesso para tradução.")
        return null
    }

    try {
        const data = {
            q: text,
            target: target,
            format: format
        }

        if (source) data.source = source

        const response = await axios.post(
            "https://translation.googleapis.com/language/translate/v2",
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json charset=utf-8"
                }
            }
        )

        if (response.data && response.data.data && response.data.data.translations) {
            return response.data.data.translations[0].translatedText
        }

        return null
    } catch (err) {
        console.error("Erro na tradução:", err.response ? err.response.data : err.message)
        throw err
    }
}
