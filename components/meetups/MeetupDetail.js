import Card from "../ui/Card";

function MeetupDetail(props) {
  return (
      <>
        <div>
          <img src={props.image} alt={props.title} />
        </div>
        <div>
          <h3>{props.title}</h3>
          <h3>{props.address}</h3>
        </div>
        <div>
          <p>{props.description}</p>
        </div>
      </>
  );
}

export default MeetupDetail;
