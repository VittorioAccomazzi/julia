import React, {useState} from "react";
import AnimatorClassic from './classic/Animator'
import AnimatorPhoenix from './phoenix/Animator'
import AnimatorNewton  from './newton/Animator'



const AnimatorMix = () => {
    let [rnd, setRnd] = useState<number>(Math.random());

    const completed = ()=>{
        setRnd(Math.random());
    }

    return (
        <>
        { (rnd < 0.4) ?
            (
                <AnimatorClassic onCompleted={completed} />
            ) : null
        }
        {
            (rnd>=0.4 && rnd < 0.7) ?
            (
                <AnimatorPhoenix onCompleted={completed} />
            ) : null
        }
        {
            (rnd>= 0.7) ?
            (
                <AnimatorNewton onCompleted={completed} />
            ) : null
        }
        </>

    )
}

export default  AnimatorMix;