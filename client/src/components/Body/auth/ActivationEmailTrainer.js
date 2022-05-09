import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { errorNotifi, successNotifi } from '../../utils/Notification/Notification'

function ActivationEmailTrainer() {
    const { activation_token } = useParams('')


    useEffect(() => {
        if (activation_token) {
            const activationEmails = async () => {
                try {
                    const res = await axios.post('/admin/activation_trainer', { activation_token })
                    successNotifi(res.data.msg)
                } catch (err) {
                    err.response.data.msg && errorNotifi(err.response.data.msg)
                }
            }
            activationEmails()
        }
    }, [activation_token])
    console.log(activation_token)
    return (
        <div>

        </div>
    )
}

export default ActivationEmailTrainer