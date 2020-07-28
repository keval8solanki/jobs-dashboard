import { statuscolors } from "../Styles/StyledComponents"


export const statusColor = (status) => {
    if (status === 'Selected') {
        return { color: statuscolors.success, bgColor: statuscolors.successBg }
    } else if (status === 'Called For Interview') {
        return { color: statuscolors.review, bgColor: statuscolors.reviewBg }
    } else if (status === 'Applied') {
        return { color: statuscolors.pending, bgColor: statuscolors.pendingBg }
    } else if (status === 'Rejected') {
        return { color: statuscolors.failed, bgColor: statuscolors.failedBg }
    }
}

export const daysAgoCalculator = (date) => {
    const secsInDay = 86400000
    let currentDate = new Date()
    const remainingSecs = currentDate - date
    const days = remainingSecs / secsInDay
    return Math.floor(days)
}