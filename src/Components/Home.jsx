function Home() {
    return (
        <div className="App">
            <button onClick={() =>  {
                localStorage.clear();
            }}>Logout</button>
        </div>
    );
}

export default Home;