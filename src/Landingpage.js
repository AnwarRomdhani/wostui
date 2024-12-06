import React from 'react';
import './Landingpage.css';
import deepf1 from './assets/deepf1.jpg';
import deepf2 from './assets/deepf2.jpg';
import deepf3 from './assets/deepf3.jpg';
import deepf4 from './assets/deepf4.jpg';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <section className="content-section">
        <img src={deepf1} alt="Ocean 1" className="ocean-image" />
        <p>
          The ocean covers more than 70% of the Earth's surface and is home to a staggering diversity of life forms, many of which remain undiscovered. From the vibrant coral reefs teeming with fish to the dark abyssal plains where strange creatures lurk, the ocean is a world of wonder and mystery. However, this vast and vital ecosystem faces numerous threats, including pollution, overfishing, and climate change.
        </p>
      </section>

      <section className="content-section reverse">
        <p>
          Marine life is as varied as it is fascinating, with creatures ranging from microscopic plankton to the colossal blue whale, the largest animal on Earth. Coral reefs, often referred to as the "rainforests of the sea," support an incredible variety of species and provide essential services such as coastal protection and carbon sequestration. Yet, they are rapidly declining due to ocean acidification and warming waters.
        </p>
        <img src={deepf2} alt="Ocean 2" className="ocean-image" />
      </section>

      <section className="content-section">
        <img src={deepf3} alt="Ocean 3" className="ocean-image" />
        <p>
          Human activities have a profound impact on ocean health. Plastic waste accumulates in the oceans, forming massive garbage patches and endangering marine animals that ingest or become entangled in debris. Meanwhile, rising sea levels and extreme weather events linked to climate change threaten coastal communities and marine habitats alike.
        </p>
      </section>

      <section className="content-section reverse">
        <p>
          Conservation efforts are crucial to safeguarding the future of our oceans. Establishing marine protected areas, reducing carbon emissions, and promoting sustainable fishing practices can help mitigate the damage. Public awareness and education also play a vital role in inspiring action and fostering a deeper connection to the ocean's beauty and importance.
        </p>
        <img src={deepf4} alt="Ocean 4" className="ocean-image" />
      </section>
    </div>
  );
};

export default LandingPage;
