export default function Errorpage({ title, message, onConfirm }) {
    return (
        <div className="error">
            <h2>{title}</h2>
            <p>{message}</p>
            {onConfirm && (
                <div>
                    <button onClick={onConfirm} className="button">Okay</button>

                </div>
            )}
        </div>
    );
}