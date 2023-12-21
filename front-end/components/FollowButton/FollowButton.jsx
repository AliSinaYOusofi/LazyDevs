

export default function FollowButton({follows, toBeFollowed}) {
    const [alreadyFollows, setAlreadyFollows] = useState()
    const [spinner, setSpinner] = useState(false);
    
    const {currentUser} = useAppContext()
    
    useEffect( () => {
        // check if the user follows
        setAlreadyFollows(follows)
    }, [])

    const handleFollowButton = async () => {
        setSpinner(true)
        try {
            const response = await fetch(`http://localhost:3001/blogRoutes/follow?user_id=${currentUser ? currentUser?._id : null}`, 
                {
                    method: "GET",
                    credentials: "include",
                }   
            );
            const data = await response.json()

            if (data.message === "following") {
                setAlreadyFollows(true)
            } else if (data.message === "unfollowing") {
                setAlreadyFollows(false)
            }
        }
        catch(e) {
            console.error("Error!! following a user", e)
        }
        finally {
            setSpinner(false)
        }
    }

    return (
        <>
            
        </>
    )
}
