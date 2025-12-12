const 
    config = require('config')
    axios = require('axios')

const { google } = require('googleapis')

async function getAccessToken() {
    const 
        scopes = ["https://www.googleapis.com/auth/drive.readonly"]
        auth = new google.auth.GoogleAuth({
            keyFile: config.embed.google.keyFile,
            scopes: scopes,
        })
        client = await auth.getClient();
        tokens = await client.getAccessToken();

    return tokens.token;
}

exports.list = async (folderId) => {
  const token = await getAccessToken();

  const url = "https://www.googleapis.com/drive/v3/files";
  const params = {
    q: `'${folderId}' in parents`,
    fields: "files(id, name, mimeType, modifiedTime, size)"
  }

  const resp = await axios.get(url, {
    params,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return resp.data.files
}
