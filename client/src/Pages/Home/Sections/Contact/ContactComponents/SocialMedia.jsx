import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faGithub, faImdb, faGoodreads, faSpotify, faLinkedin } from '@fortawesome/free-brands-svg-icons'

export function SocialMedia({
    appData
}){
    const allSocials = appData?.allSocials

    console.log(allSocials)
    return(
        <div className='grid grid-cols-2'>
            {allSocials?.map((social, index) => (
                <div key={index} className="flex justify-center mt-4">
                    <a href={social?.url} className='social-icon'>
                        <FontAwesomeIcon 
                            className='social-icon-img'
                            icon={
                                social?.social_name.toLowerCase() === "instagram"
                                    ? faInstagram
                                    : social?.social_name.toLowerCase() === "linkedin"
                                    ? faLinkedin
                                    : social?.social_name.toLowerCase() === "github"
                                    ? faGithub
                                    : social?.social_name.toLowerCase() === "goodreads"
                                    ? faGoodreads
                                    : null
                        } />
                    </a>
                </div>
            ))}
        </div>
    )
}