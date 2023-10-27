import { useState } from 'react'
import MentorListDetails from '../../components/MentorListDetails/MentorListDetails'
import EditMentorDetailsForm from '../../components/EditMentorDetailsForm/EditMentorDetailsForm'
import useAuth from "../../hooks/use-auth";
import useSelf from '../../hooks/use-self';
import NotFound404Page from '../../components/NotFound404Page/NotFound404Page';
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
            <div className='404'>
               <NotFound404Page />
            </div>
        }

    </>)
}

export default MentorDashboard