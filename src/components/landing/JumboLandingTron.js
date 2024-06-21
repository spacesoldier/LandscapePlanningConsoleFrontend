
import SubscriptionPopover from "./LoginPopover";

function JumboLandingTron({keycloakInstance}){

    return(

        <section
            className="bg-cover h-screen -mt-40 bg-no-repeat bg-[url('img/area_view.jpeg')] bg-gray-700 bg-blend-multiply"
        >
            <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
                <h1 className="mt-20 mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
                    Конструктор пространственных решений
                </h1>
                <p className="mb-20 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
                    Автоматизированная система смарт-наполнения зон отдыха дворовых территорий.
                    Подбор оборудования в соответствии с потребностями жителей и территории в целом
                </p>
                <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                    <SubscriptionPopover btnSize="lg" authService={keycloakInstance}/>
                </div>
            </div>
        </section>

    );

}

export default JumboLandingTron

