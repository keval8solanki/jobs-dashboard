import { statuscolors } from '../Styles/StyledComponents'
import axios from 'axios'
import { API_URI } from '../../Endpoint'
import { toast } from '../../Components/Toast'

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

export const getAndSaveData = async (URI, save, dispatch) => {
	try {
		const { data } = await axios.get(URI)
		dispatch(save(data))
	} catch (err) {
		console.log(err)
	}
}

export const deleteJobHandler = async (job, setState) => {
	try {
		await axios.delete(`${API_URI}${job && job._id}`)
		setState(true)
		toast.success('Job deleted succesfully', {
			position: toast.POSITION.BOTTOM_RIGHT,
		})
	} catch (err) {
		toast.error('Error in job deletion', {
			position: toast.POSITION.BOTTOM_RIGHT,
		})
	}
}

export const Capitalize = (str) => {
	const arr = str.split('')
	arr.shift()
	const firstLetter = str[0].toUpperCase()
	const remainingLetters = arr.join('')
	return `${firstLetter}${remainingLetters}`
}

export const statusFinder = (candidate, job) => {
	if (candidate && job) {
		const index = candidate.jobs.findIndex((item) => {
			if (item.id._id) {
				return item.id._id.toString() === job._id.toString()
			} else {
				return item.id.toString() === job._id.toString()
			}
		})
		const status = candidate.jobs[index].status
		return status
	}
}

export const statusIndex = (candidate, job) => {
	if (candidate && job) {
		const index = candidate.jobs.findIndex((item) => {
			if (item.id._id) {
				return item.id._id.toString() === job._id.toString()
			} else {
				return item.id.toString() === job._id.toString()
			}
		})
		return index
	}
}
