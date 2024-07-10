import { request } from "@/utils"
import { useEffect } from "react"

const Layout = () => {
  useEffect(() => {
    request.get('/v1_0/user/profile')
  }, [])
  return <div>this is Layout</div>
}

export default Layout