import './topbar.css'
import {Search, Person, Chat, Notifications} from '@material-ui/icons' 

export default function Topbar() {
    return (
       <div className="topbarContainer">
        <div className="topbarLeft">
            <span className="logo">Avengers Social</span>
        </div>
        <div className="topbarCenter">
            <div className="searchbar">
                <Search className = "searchIcon" />
                <input placeholder='search for people, posts, video etc.' className="searchInput" />
            </div>
        </div>
        <div className="topbarRight">
            <div className="topbarLinks">
                <span className="topbarLink">Homepage</span>
                <span className="topbarLink">Timeline</span>
            </div>
            <div className="topbarIcons">
                <div className="topbarIconItem">
                    <Person/>
                    <span className="topbarIconBadge">1</span>
                </div>
                <div className="topbarIconItem">
                    <Chat/>
                    <span className="topbarIconBadge">69</span>
                </div>
                <div className="topbarIconItem">
                    <Notifications/>
                    <span className="topbarIconBadge">14</span>
                </div>
            </div>
            <img src="/assets/person/1.jpg" alt="" className="topbarImg" />
        </div>
       </div>
    )
}