import React, {useState} from "react";
import AnimatorClassic from './classic/Animator'
import AnimatorPhoenix from './phoenix/Animator'



const AnimatorMix = () => {
    let [rnd, setRnd] = useState<number>(Math.random());

    const completed = ()=>{
        setRnd(Math.random());
    }

    return (
        <>
        { (rnd < 0.6) ?
            (
                <AnimatorClassic onCompleted={completed} />
            ) : null
        }
        {
            (rnd>=0.6) ?
            (
                <AnimatorPhoenix onCompleted={completed} />
            ) : null
        }
        </>

    )
}

export default  AnimatorMix;