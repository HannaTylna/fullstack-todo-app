import { useState } from "react";

type LoginInputProps = {
    onLogin: (username: string, password: string) => Promise<void>;
};

export const LoginInput = (props: LoginInputProps) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const attemptLogin = async () => {
        console.log(`Login with ${username} and ${password}`)
        props.onLogin(username, password);
        setUsername("");
        setPassword("");
    };

    return (
        <>
            <h3>Login</h3>
            <div className="row">
                <div className="input-field col s6">
                    <input
                        value={username}
                        type="text"
                        className="validate"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label className="active">Username</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s6">
                    <input
                        value={password}
                        type="password"
                        className="validate"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="active">Username</label>
                </div>
            </div>
            <div className="row">
            <button className="btn waves-effect waves-light" type="submit" name="action" onClick={attemptLogin}>Login
                <i className="material-icons right">send</i>
            </button>
            </div>
        </>
    )
}