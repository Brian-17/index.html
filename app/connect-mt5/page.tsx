export default function ConnectMT5Page() {
  return (
    <div style={{ minHeight: "100vh", background: "white", color: "black", padding: 50 }}>
      <h1>Connect MT5 Page Works!</h1>
      <p>If you see this, route is fixed.</p>
      <form>
        <input placeholder="MT5 Login" style={{display:"block", padding:10, margin:10, border:"1px solid black"}} />
        <input placeholder="Password" style={{display:"block", padding:10, margin:10, border:"1px solid black"}} />
        <input placeholder="Server" style={{display:"block", padding:10, margin:10, border:"1px solid black"}} />
        <button style={{padding:10, background:"black", color:"white"}}>Connect</button>
      </form>
    </div>
  );
}
