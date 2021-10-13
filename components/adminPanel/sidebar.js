import styles from '../../styles/adminPanel/sidebar.module.css'
import Image from 'next/image'

import { BsGearWideConnected } from 'react-icons/bs'
import { FaRegUser } from 'react-icons/fa'
import { IoIosArrowForward } from 'react-icons/io'
import {GiSettingsKnobs} from 'react-icons/gi'

export default function Sidebar() {
    return (

        <div className={`${styles.sidebar_base}`}  >




            <div className="d-flex  align-content-center" >

                <div className={`${styles.logoHolder}`}>
                    <Image
                        src="/astrochrchalogo.png"
                        layout="fixed"
                        width={48}
                        height={48}
                    />
                </div>

                <div className={`${styles.mainText}`}>
                    Admin Panel
                </div>

                <div className={`ms-auto ${styles.center_div}`}>
                    <BsGearWideConnected />
                </div>

            </div>



            {/* Main Buttons */}
            <div className={`${styles.button_wrapper}`} >



                <div className={`${styles.button}  ${styles.buttonActive}  ${styles.center_div}` } >

                    <span>
                    <FaRegUser />
                    </span>

                    <span className={`${styles.buttonText}`}>
                    User Management System
                    </span>

                    <span className="ms-auto">
                    <IoIosArrowForward />
                    </span>


                </div>

                <div className={`${styles.button}    ${styles.center_div} my-2` } >

                    <span>
                    <GiSettingsKnobs />
                    </span>

                    <span className={`${styles.buttonText}`}>
                    Astrologer Management System
                    </span>

                    <span className="ms-auto">
                    <IoIosArrowForward />
                    </span>


                </div>

            </div>




        </div>

    )
}