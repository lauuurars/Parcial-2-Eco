import { useState } from "react"
import { BASE_URL } from "../../consts/api"
import { useAuth } from "../../contexts/AuthProvider"
import { useNavigate } from "react-router-dom"

export const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleLogin = async () => {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })
        
        const result = await response.json()
        login({ accessToken: result.accessToken })
        if (result.accessToken) navigate("/game")
    }

    return (
        <section>
            <h1>🏟 WonderArena</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Ingresar</button>
            <p>No tienes cuenta? <a href="/signup">Registrate</a></p>
        </section>
    )
}
