export default function  WarningComponent({info , close}){
    const handleClose = () => {
        close()
    }

    return(
        <div className="text-red-700 flex space-x-3">
            <span>{info}</span>
            <button className="border border-1 border-red-700 rounded-md" onClick={handleClose}>Close</button>
        </div>
    );
}