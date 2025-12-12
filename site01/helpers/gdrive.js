const
    config = require('config')
    axios = require('axios')

const { google } = require('googleapis')

const auth = new google.auth.GoogleAuth({
    keyFile: config.embed.google.keyFile,
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
})

async function getAccessToken() {
    const client = await auth.getClient();
    const tokens = await client.getAccessToken();

    return tokens.token;
}

exports.list = async (folderId) => {
    const token = await getAccessToken()
    const params = {
        q: `'${folderId}' in parents and trashed = false`,
        fields: "files(id, name, mimeType, modifiedTime, size)"
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
    
    return resp.data.files
}
