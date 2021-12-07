import { useRouter } from 'next/router';

import NewMeetupForm from '../../components/meetups/NewMeetupForm';

const NewMeetupPage = () => {
	const router = useRouter();

	const handleMeetup = async (data) => {
		const response = await fetch('/api/new-meetup', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		const res_data = await response.json();
		router.replace('/')
	}

	return (
		<NewMeetupForm onAddMeetup={handleMeetup} />
	)
}

export default NewMeetupPage;
