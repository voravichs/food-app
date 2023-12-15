import icon from '../images/icon.png'
import github from '../images/githublight.png'

export default function Results() {
    return (
        <div className="h-36 px-40 py-4
            grid grid-cols-3 place-items-center 
            bg-slate-400 dark:bg-slate-800">
            <a href='/'>
                <img className='h-20'
                    src={`${icon}`} 
                    alt='Footer Site Logo'/>
            </a> 
            <a className='text-2xl text-neutral-800 dark:text-neutral-200'
                href='/'>
                Credits
            </a>
            <a href='https://github.com/voravichs/underground-foodies'>
                <img src={`${github}`}
                    alt='Github logo with link'>
                </img>
            </a>
        </div>
    )
}