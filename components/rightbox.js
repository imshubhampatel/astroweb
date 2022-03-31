import React from 'react'
import { Button, makeStyles, Typography, TextField, InputAdornment } from '@material-ui/core'
import StarRateIcon from '@material-ui/icons/StarRate';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Search } from "@material-ui/icons";

const Usestyles=makeStyles({
    rightboxcontainer:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        flexWrap:'wrap',
        backgroundColor:'rgba(255, 243, 221, 1)'
    },
    cardbox:{
        width:'500px',
        borderRadius:'50px',
        display:'flex',
        //backgroundColor:'blue',
        height:'200px',
        border:'5px solid rgba(255, 225, 190, 1)',
        margin:'15px'
    },
    img:{
        width:'170px',
        height:'100%',
        borderTopLeftRadius:'50px',
        borderBottomLeftRadius:'50px'
    },
    contentbox:{
        display:'flex',
        flexDirection:'column',
        width:'70%',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        marginLeft:'3%'
    },
    minicontent:{
        display:'flex',
        marginTop:'5px'
    },
    splbox:{
        display:'flex',
        flexDirection:'column',
        marginTop:'15px',
        //backgroundColor:'red',
        width:'100%',
        justifyContent:'flex-start',
        alignItems:'flex-start'
    },
    spls:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        //backgroundColor:'yellow',
        width:'100%'
    },
    spl:{
        backgroundColor:'rgba(255, 225, 190, 1)',
        width:'30%',
        margin:'5px',
        borderRadius:'3px',
        color:'rgba(245, 133, 0, 1)'
    },
    endbox:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        marginTop:'5px',
        //backgroundColor:'red',
        width:'100%'
    },
    consultbtn:{
        backgroundColor:'orange',
        marginLeft:'30px'
    },
    topbox:{
        width:'100%',
        display:'flex',
        alignItems:'center',
        justifyContent:'flex-end',
        //backgroundColor:'red'
    },
    sortbtns:{
        backgroundColor:'white',
        width:'15%',
        marginRight:'5%'
    },
    search:{
        backgroundColor:'white',
        borderRadius:'10px',
        marginRight:'5%'
    },
    name:{
        color:'rgba(245, 133, 0, 1)',
        fontSize:'18px',
        marginLeft:'3%'
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
                <Typography className={classes.name}>Astro Surendra</Typography>
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
                    <Button className={classes.consultbtn}>Consult now</Button>
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
    </div>
  )
}

export default rightBox