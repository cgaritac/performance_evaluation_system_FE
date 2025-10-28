import { MainProps } from "./main.interface.ts"

const Main: React.FC<MainProps> = ({children, mainClassName, sectionClassName}) => {
    return (
        <main className={`flex justify-center items-start h-full overflow-auto ${mainClassName}`}>
            <section className={`responsive-container h-full ${sectionClassName}`}>
            {children}
            </section>

        </main>
    );
};

export default Main;