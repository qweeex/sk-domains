import { connect } from 'mongoose'

class DatabaseManager{
    public static readonly Instance: DatabaseManager = new DatabaseManager()
    public URL: string = `mongodb+srv://qweeex_domain:dxgnr257bMd9OQsN@cluster0.uag8a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`


    public async Connect(): Promise<void>{
        await connect(this.URL)
    }
}

export default DatabaseManager