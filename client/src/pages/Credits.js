import yelplogo from "../images/yelplogo.png"
import voravich from "../images/profilepics/voravich.jpg"
import ken from "../images/profilepics/ken.jpg"
import peici from "../images/profilepics/peici.jpg"
import antina from "../images/profilepics/antina.jpg"


/**
 * Credits Page
 */
export default function Credits() {
    return(
        <div className="mx-20 flex gap-20">
            <div>
                <h1 className="text-4xl font-bold mb-4">Authors</h1>
                <a className="flex mb-4 group hover:cursor-pointer"
                    href="https://github.com/voravichs">
                    <img src={`${voravich}`} alt="empty profile"
                        className="w-20 rounded-lg mr-4"/>
                    <p className="text-3xl group-hover:underline" >
                        Voravich Silapachairueng
                    </p>
                </a>
                <a className="flex mb-4 group hover:cursor-pointer"
                    href="https://github.com/yamakenth">
                    <img src={`${ken}`} alt="empty profile"
                        className="w-20 rounded-lg mr-4"/>
                    <p className="text-3xl group-hover:underline" >
                        Ken Yamada
                    </p>
                </a>
                <a className="flex mb-4 group hover:cursor-pointer"
                    href="https://github.com/antinayeh">
                    <img src={`${antina}`} alt="empty profile"
                        className="w-20 rounded-lg mr-4"/>
                    <p className="text-3xl group-hover:underline" >
                        Antina Yeh
                    </p>
                </a>
                <a className="flex mb-4 group hover:cursor-pointer"
                    href="https://github.com/peiciqiu">
                    <img src={`${peici}`} alt="empty profile"
                        className="w-20 rounded-lg mr-4"/>
                    <p className="text-3xl group-hover:underline" >
                        Peici Qiu
                    </p>
                </a>
            </div>
            <div>
                <h1 className="text-4xl font-bold mb-4">Assets</h1>
                <a className="flex mb-4 group hover:cursor-pointer"
                    href="https://www.yelp.com/dataset">
                    <img src={`${yelplogo}`} alt="yelp logo"
                        className="w-20 rounded-lg mr-4"/>
                    <p className="text-3xl group-hover:underline" >
                        Yelp Database
                    </p>
                </a>
            </div>
        </div>
    )
}