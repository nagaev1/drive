

const url = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.iconscout.com%2Ficon%2Ffree%2Fpng-512%2Favatar-380-456332.png&f=1&nofb=1&ipt=92202a5820d74ac39e324088fd17cef439e102125e68e058539c1a617a72531c&ipo=images"
export default function Avatar(props) {
    
    return (
        <div className={props.className}>
            <img src={url} alt="avatar" />
        </div>
    )
}