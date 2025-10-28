import { HeroProps } from "./hero.interface";

const Hero: React.FC<HeroProps> = ({children, className}) => {
    return (
        <h1 className={`flex justify-between items-center
                        leading-tight font-sans font-medium
                        text-fk-title-size text-fk-text-label 
                        py-3 col-span-2
                        ${className}`
        }>
            {children}
        </h1>
    )
}

export default Hero;