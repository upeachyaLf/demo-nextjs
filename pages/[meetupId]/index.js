import Head from 'next/head';
import { Fragment } from 'react';
import { ObjectId } from 'mongodb';

import MeetupDetail from "../../components/meetups/MeetupDetail";

import { connectToMongoDb } from '../../utils/connect';

function MeetupDetails(props) {
	return(
		<>
		<Head>
			<title>{props.meetupDetail.title}</title>
			<meta name="description" content={props.meetupDetail.description}></meta>
		</Head>
			<MeetupDetail 
				image = {props.meetupDetail.image}
				title={props.meetupDetail.title}
				address={props.meetupDetail.address}
				description={props.meetupDetail.description}
			/>
		</>
	)
}

export async function getStaticPaths() {
	const connection = await connectToMongoDb();
	const meetupsCollection = connection.db.collection('meetups');
	const meetups = await meetupsCollection.find().toArray();
	connection.client.close();
	
	return {
		paths: meetups.map(x => {
			return {
				params: {
					meetupId: x._id.toString()
				}
			}
		}),
		fallback: false
	}
}

export async function getStaticProps(context) {
	const meetupId = context?.params?.meetupId;
	const connection = await connectToMongoDb();
	const meetupsCollection = connection.db.collection('meetups');
	const selectedMeetup = await meetupsCollection.findOne({_id: ObjectId(meetupId)});
	connection.client.close();

	return {
		props: {
			meetupDetail : {
				title: selectedMeetup.title,
				description: selectedMeetup.description,
				image: selectedMeetup.image,
				address: selectedMeetup.address,
				id: selectedMeetup._id.toString()
			}
		}
	}
}

export default MeetupDetails;
