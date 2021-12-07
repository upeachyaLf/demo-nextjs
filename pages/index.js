import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';

function HomePage(props) {
  return <MeetupList meetups={props?.meetup_data?.meetups} />
}

export async function getStaticProps() {
  let meetups = [];
  const client = await MongoClient.connect(process.env.DB_CONFIG)
	const db = client.db();

	const meetupsCollection = db.collection('meetups');
  meetups = await meetupsCollection.find().toArray();
	client.close();

  return {
    props: {
      meetup_data: {
        meetups: meetups.map(x => {
          return {
            image: x.image,
            title: x.title,
            address: x.address, 
            id: x._id.toString()
          }
        })
      }
    }
  }
}

export default HomePage;
