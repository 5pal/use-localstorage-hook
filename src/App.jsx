import "./App.css";

const useNotification = (title, options) => {
    if (!("Notification" in window)) {
        alert("Turn on notifications on your browser");
        return;
    }

    const fireNotif = () => {
        if (Notification.permission !== "granted") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    new Notification(title, options);
                } else {
                    return;
                }
            });
        } else {
            new Notification(title, options);
        }
    };

    return fireNotif;
};

function App() {
    const triggerNotif = useNotification("Is it work?", {
        body: " I am not",
        icon: "vite.svg",
    });
    return (
        <>
            <button onClick={triggerNotif}>Notify me!</button>
        </>
    );
}

export default App;
