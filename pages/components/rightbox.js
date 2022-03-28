import React from 'react'
import { Button, makeStyles, Typography } from '@material-ui/core'
import StarRateIcon from '@material-ui/icons/StarRate';

const Usestyles=makeStyles({
    rightboxcontainer:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        flexWrap:'wrap'
    },
    cardbox:{
        width:'500px',
        borderRadius:'10px',
        display:'flex',
        //backgroundColor:'blue',
        height:'200px',
        border:'2px solid',
        margin:'15px'
    },
    img:{
        width:'150px',
        height:'100%',
        borderRadius:'10px'
    },
    contentbox:{
        display:'flex',
        flexDirection:'column',
        width:'70%',
        
    },
    minicontent:{
        display:'flex',
        marginTop:'5px'
    },
    splbox:{
        display:'flex',
        flexDirection:'column',
        marginTop:'5px'
    },
    spls:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    spl:{
        backgroundColor:'yellow',
        width:'20%',
        margin:'4px',
        borderRadius:'3px'
    },
    endbox:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        marginTop:'5px'
    },
    btn:{
        backgroundColor:'orange',
        marginLeft:'10px'
    }
});

const rightBox = () => {
    const classes=Usestyles();
  return (
    <div className={classes.rightboxcontainer}>
        <div className={classes.cardbox}>
            <div >
                <img className={classes.img} src="https://cdn.ndtv.com/tech/images/gadgets/thumbs/pikachu_hi_pokemon_thumb.jpg"></img>
            </div>
            <div className={classes.contentbox}>
                <Typography>Astro Surendra</Typography>
                <div className={classes.minicontent}>
                    <StarRateIcon/>
                    <Typography>5 (3.4k reviews) | 15 years</Typography>
                </div>
                <div className={classes.minicontent}>
                    <StarRateIcon/>
                    <Typography>Hindi, Marathi</Typography>
                </div>
                <div className={classes.splbox}>
                    <Typography>Main speciaslity</Typography>
                    <div className={classes.spls}>
                        <div className={classes.spl}>vedic</div>
                        <div className={classes.spl}>Tarot</div>
                        <div className={classes.spl}>vastu</div>
                    </div>
                </div>
                <div className={classes.endbox}>
                    <Typography>₹25/min</Typography>
                    <Button className={classes.btn}>Consult now</Button>
                </div>
            </div>
        </div>
        <div className={classes.cardbox}>
            <div >
                <img className={classes.img} src="https://cdn.ndtv.com/tech/images/gadgets/thumbs/pikachu_hi_pokemon_thumb.jpg"></img>
            </div>
            <div className={classes.contentbox}>
                <Typography>Astro Surendra</Typography>
                <div className={classes.minicontent}>
                    {/* <StarRateIcon/> */}
                    <Typography>5 (3.4k reviews) | 15 years</Typography>
                </div>
                <div className={classes.minicontent}>
                    {/* <StarRateIcon/> */}
                    <Typography>Hindi, Marathi</Typography>
                </div>
                <div className={classes.splbox}>
                    <Typography>Main speciaslity</Typography>
                    <div className={classes.spls}>
                        <div className={classes.spl}>vedic</div>
                        <div className={classes.spl}>Tarot</div>
                        <div className={classes.spl}>vastu</div>
                    </div>
                </div>
                <div className={classes.endbox}>
                    <Typography>₹25/min</Typography>
                    <Button className={classes.btn}>Consult now</Button>
                </div>
            </div>
        </div>
        <div className={classes.cardbox}>
            <div >
                <img className={classes.img} src="https://cdn.ndtv.com/tech/images/gadgets/thumbs/pikachu_hi_pokemon_thumb.jpg"></img>
            </div>
            <div className={classes.contentbox}>
                <Typography>Astro Surendra</Typography>
                <div className={classes.minicontent}>
                    {/* <StarRateIcon/> */}
                    <Typography>5 (3.4k reviews) | 15 years</Typography>
                </div>
                <div className={classes.minicontent}>
                    {/* <StarRateIcon/> */}
                    <Typography>Hindi, Marathi</Typography>
                </div>
                <div className={classes.splbox}>
                    <Typography>Main speciaslity</Typography>
                    <div className={classes.spls}>
                        <div className={classes.spl}>vedic</div>
                        <div className={classes.spl}>Tarot</div>
                        <div className={classes.spl}>vastu</div>
                    </div>
                </div>
                <div className={classes.endbox}>
                    <Typography>₹25/min</Typography>
                    <Button className={classes.btn}>Consult now</Button>
                </div>
            </div>
        </div>
        <div className={classes.cardbox}>
            <div >
                <img className={classes.img} src="https://cdn.ndtv.com/tech/images/gadgets/thumbs/pikachu_hi_pokemon_thumb.jpg"></img>
            </div>
            <div className={classes.contentbox}>
                <Typography>Astro Surendra</Typography>
                <div className={classes.minicontent}>
                    {/* <StarRateIcon/> */}
                    <Typography>5 (3.4k reviews) | 15 years</Typography>
                </div>
                <div className={classes.minicontent}>
                    {/* <StarRateIcon/> */}
                    <Typography>Hindi, Marathi</Typography>
                </div>
                <div className={classes.splbox}>
                    <Typography>Main speciaslity</Typography>
                    <div className={classes.spls}>
                        <div className={classes.spl}>vedic</div>
                        <div className={classes.spl}>Tarot</div>
                        <div className={classes.spl}>vastu</div>
                    </div>
                </div>
                <div className={classes.endbox}>
                    <Typography>₹25/min</Typography>
                    <Button className={classes.btn}>Consult now</Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default rightBox