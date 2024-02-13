import logo from './logo.svg';
import './App.css';
import { useEffect, useState  } from 'react';
import activityService from './services/activity'

function App() {
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState('');

  useEffect(() => {
    activityService
    .getAllActivities()
    .then(data => {
      setActivities(data.activities)
    })

    activityService
    .getNewActivity()
    .then(data => {
      setNewActivity(data.activity)
    })
  }, [])

  const handleNewActivity = () => {
    activityService
    .getNewActivity()
    .then(data => {
      setNewActivity(data.activity)
    })
  }

  const handleAddActivity = newActivity => {
    activityService
    .addActivity({
      activity: newActivity,
    })
    .then(() => {
      setActivities([...activities, {activity: newActivity}])
    })

    activityService
    .getNewActivity()
    .then(data => {
      setNewActivity(data.activity)
    })
  }

  const handleDeleteActivities = () => {
    activityService
    .deleteAllActivities()
    .then(() => {
      setActivities([])
    })
  }

  return (
    <div className='container'>
      {/* <div>
        <Row id="first-row">
          <Col>
            <ActivityDisplay name={newActivity}/>
          </Col>
        </Row>
        <Row id="second-row">
          <Col> 
            <Choices handleNewActivity={handleNewActivity} handleAddActivity={handleAddActivity} name={newActivity}/>
          </Col>
        </Row>
        <Row>
          <Col>
            <ul>
              <h2>Today's Activities: {activities.length}</h2>
              <StoredActivities list={activities} />
            </ul>
          </Col>
        </Row>
        <Row id="fourth-row">
          <Col>
            <DeleteActivities handleDeleteActivities={handleDeleteActivities} />
          </Col>
        </Row>
      </div> */}

<div>
        
    <h1 id="question">Do you want to <span id='suggestedActivity' style={{color: "red"}}>{ newActivity }</span> today?</h1>
    <button id="primary-btn" onClick={() => handleNewActivity()}>No thanks...</button>
      <button id="success-btn" onClick={() => handleAddActivity(newActivity)}>Sounds fun!</button>
        
      <ul>
              <h2>Today's Activities: {activities.length}</h2>
              {
                activities.map((activity, idx) => {
                  return <li>{activity.activity}</li>
          
                })
              }
            </ul>
      
      </div>
    </div>
  );
}

export default App;
