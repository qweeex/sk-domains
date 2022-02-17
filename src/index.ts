import WebManager from "./Manager/WebManager";
import DatabaseManager from "./Manager/DatabaseManager";


// @ts-ignore
async function ServerStart() {
    await DatabaseManager.Instance.Connect()
        .then(() => console.log('Database connect...'))
        .catch(e => console.log(e));
    WebManager.Instance.Start()
}

ServerStart()
