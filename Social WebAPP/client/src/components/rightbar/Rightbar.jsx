import './rightbar.css'
import Online from '../online/Online'
import {Users} from '../../dummyData'

export default function Rightbar({profile}) {
    const HomeRightBar = () => {
        return (
            <>
              <div className="birthdayContainer">
                    <img className="birthdayImg" src="/assets/gift.png" alt="" />
                    <span className="birthdayText">
                        <b>Pepper Potts</b> and <b>1 other friend</b> have their birthday today
                    </span>
                </div>
                <img src="/assets/ad.jpg" alt="" className="rightbarAd" />
                <h4 className="rightbarTitle">Online friends</h4>
                <ul className="rightbarFreindList">
                   {Users.map(u=> (
                    <Online key = {u.id} user = {u}/>
                   ))} 
                </ul>
            </>
        )
    }
    
    const ProfileRightBar = () => {
        return (
            <>
              <h4 className="rightbarTitle">User information</h4>
              <div className="rightbarInfo">
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">City:</span>
                    <span className="rightbarInfoValue">Malibu CA</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">From:</span>
                    <span className="rightbarInfoValue">New York</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">Relationship:</span>
                    <span className="rightbarInfoValue">Single</span>
                </div>
              </div>
              <h4 className="rightbarTitle">User friends</h4>
              <div className="rightbarFollowings">
                <div className="rightbarFollowing">
                    <img src="/assets/person/2.jpg" alt="" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">Bruce Banner</span>
                </div>
                <div className="rightbarFollowing">
                    <img src="/assets/person/3.jpg" alt="" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">Thor Odinson</span>
                </div>
                <div className="rightbarFollowing">
                    <img src="/assets/person/4.jpg" alt="" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">Steven Rogers</span>
                </div>
                <div className="rightbarFollowing">
                    <img src="/assets/person/5.jpg" alt="" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">Natasha Romanoff</span>
                </div>
                <div className="rightbarFollowing">
                    <img src="/assets/person/6.jpg" alt="" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">Clint</span>
                </div>
                <div className="rightbarFollowing">
                    <img src="/assets/person/7.jpg" alt="" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">Loki</span>
                </div>
              </div>
            </>
        )
    }
    return (
        <div className='rightbar'>
            <div className="rightbarWrapper">
                { profile ? <ProfileRightBar /> : <HomeRightBar />}
            </div>
        </div>
    )

}