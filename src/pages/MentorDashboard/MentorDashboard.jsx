import { useState } from 'react'
import MentorListDetails from '../../components/MentorListDetails/MentorListDetails'
import EditMentorDetailsForm from '../../components/EditMentorDetailsForm/EditMentorDetailsForm'
import useAuth from "../../hooks/use-auth";
import useSelf from '../../hooks/use-self';
import './MentorDashboard.css'


function MentorDashboard() {

    const { auth, setAuth } = useAuth();
    const { self, isLoading, error } = useSelf();
    const [activeMentor, setActiveMentor] = useState("")
    const [editMentorOpen, setEditMentorOpen] = useState("false")

    // Editing mentors
    const onEditMentorClick = (event) => {
        setEditMentorOpen(event)
    }

    // Current event view
    const onChangeActiveMentor = (mentorID) => {
        setActiveMentor(mentorID)
    }

    console.log(self)

    return (<>
        {auth.token && self?.is_staff ?

            <div className='mentor-dashboard'>

                <MentorListDetails editMentorOpen={editMentorOpen} onEditMentorClick={onEditMentorClick} activeMentor={activeMentor} onChangeActiveMentor={onChangeActiveMentor} />

                {editMentorOpen === "true" ?
                    <EditMentorDetailsForm onEditMentorClick={onEditMentorClick} editMentorOpen={editMentorOpen} onChangeActiveMentor={onChangeActiveMentor} activeMentor={activeMentor} />
                    :
                    <div className='no-content-yet'>
                        Filter/click on a mentor to get started.
                    </div>
                }
            </div>
            :
            <div className='forbidden'>
                <h3>Sorry fair user, ye must be of staff origins to access this page</h3>
                <img  className='compass'src='/compass.png'></img>
                <div className='forbidden-lands'></div>
                
                {/* <a target="_blank" href="https://icons8.com/icon/kJqq7olgcblR/compass">Compass</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a> */}
            </div>
        }

    </>)
}

export default MentorDashboard