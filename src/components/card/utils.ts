
import lastUpdatedObject from './models';


const monthNames: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November'
    , 'December'
];

const convertToTimeStamp = (lastUpdated: Date, username: string): lastUpdatedObject => {
    const time: string = lastUpdated.getHours().toString() + ':' + lastUpdated.getHours().toString()
    const dt: string = monthNames[lastUpdated.getMonth()] + '-' + lastUpdated.getDate().toString() + ' ' + lastUpdated.getFullYear().toString() + ' ' + time
    return {
        username: username,
        timestamp: dt
    }
}


export default convertToTimeStamp;