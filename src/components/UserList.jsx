import axios from "axios"
import { useEffect } from "react"

import { useDispatch, useSelector } from "react-redux"
import { setUserList } from "../store/slices/users"

const UserList = () => {

    const dispatch = useDispatch()

    const { list: users } = useSelector(state => state.users)

    const fetchUsers = () => {
        return (dispatch) => {
            axios
                .get("https://reqres.in/api/users?page=2")
                .then(res => {
                    dispatch(setUserList(res.data.data))
                })
                .catch(e => console.error(e))
    
        }
    }

    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])

    return (
        <nav className="container mt-4">
            <div className="row">
                {
                    users.map((u, i) => (
                        <div key={i} className="col-md-3 mb-4">
                            <div className="card">
                                <img src={u.avatar} alt={u.first_name+" "+u.last_name}/>
                                <div className="card-body">
                                    <h5 className="card-title">{u.first_name+" "+u.last_name}</h5>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </nav>
    )
}

export default UserList