import { useEffect, useRef, useState } from 'react'
function useCurrentUserId() {
    const [userid, setUserId] = useState()
    useEffect(() => {
        setUserId(JSON.parse(localStorage.getItem('user'))?.userId)
    }, [])

    return userid

}
export default useCurrentUserId