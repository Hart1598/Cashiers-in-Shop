import config from './config'
import {Sequelize} from 'sequelize'

const sequelize = new Sequelize(
    config.database.name || '',
    config.database.user || '',
    config.database.password || '',
    {
        port: Number(config.database.port),
        host: config.database.host,
        dialect:'postgres',
    }

)

export default sequelize