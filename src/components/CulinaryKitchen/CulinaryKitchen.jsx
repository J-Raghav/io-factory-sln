import React from "react";
import "./CulinaryKitchen.css";
import { varieties } from "./data";
import lastBanner from "./images/last-banner.png";
import chefBanner from "./images/chef-banner.png";
import eileenJohnsonImg from "./images/EileenJohnson.png";
import robertDowneyJrImg from "./images/RobertDowneyJr.png";
import amandaDorityImg from "./images/AmandaDority.png";
import topLeft from "./images/top-left.svg";
import topRight from "./images/top-right.svg";
import bottomLeft from "./images/bottom-left.svg";
import bottomRight from "./images/bottom-right.svg";

export function ShowCaseFood({ variety, className }) {
  return (
    <div className={`food-variety text-start ${className}`}>
      <img src={variety.image} alt={variety.title}/>
      <div className="mask"></div>
      <div className="food-content">
        <div className="px-3 py-2">
          <p className="food-title">{variety.title}</p>
          <p className="my-3">{variety.description}</p>
          <hr />
          <div className="d-flex">
            <button className="link-dark">
              {"Explore >"}
            </button>
            <span className="ms-auto">Rate</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export function ChefCard({ name, desc, image, center }) {
  return (
    <div className={`chef-card text-center ${center ? "chef-center" : ""}`}>
      <img src={image} alt={name} />
      <p className="chef-name">{name}</p>
      <p className="chef-desc">{desc}</p>
    </div>
  );
}
export default function CulinaryKitchen() {
  return (
    <div className="culinary-kitchen">
            <div className="m-3 bg-light text-black text-center">
      <div className="title-container">
        <span>Culinary Kitchen</span>
      </div>
      <p className="section-title">Varieties</p>
      <div className="section-title-hr mx-auto"></div>
      <div className="food-showcase p-3">
        {varieties.map((v, ix) => {
          return <ShowCaseFood variety={v} key={ix} />;
        })}
      </div>
      <div className="global-cuisines d-flex justify-content-around text-start py-5 my-5">
        <div className="px-5">
          <p className="cuisine-title">Indian Cuisines</p>
          <p className="cuisine-desc">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum is simply dummy text of the printing and
            typesetting industry.
          </p>
        </div>
        <div className="px-5">
          <p className="cuisine-title">American Cuisines</p>
          <p className="cuisine-desc">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum is simply dummy text of the printing and
            typesetting industry.

            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>
        </div>
        <div className="px-5">
          <p className="cuisine-title">Chinese Cuisines</p>
          <p className="cuisine-desc">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum is simply dummy text of the printing and
            typesetting industry.
          </p>
        </div>
      </div>
      <p className="section-title">Top Chefs</p>
      <div className="section-title-hr mx-auto"></div>
      <div className="position-relative">
        <img src={chefBanner} className={"w-100"} alt={"doughnuts"} />
        <div className="featured-chefs">
          <ChefCard
            name={"Eileen Johnson"}
            desc={"Lorem Ipsum has been..."}
            image={eileenJohnsonImg}
          />

          <ChefCard
            name={"Robert Downey Jr."}
            desc={
              "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s and it will continue to be..."
            }
            image={robertDowneyJrImg}
            center={true}
          />

          <ChefCard
            name={"Amanda Dority"}
            desc={"Lorem Ipsum has been..."}
            image={amandaDorityImg}
          />
        </div>
      </div>
      <div className="last-section position-relative container-fluid">
        <img src={lastBanner} alt={"serene food bg."} />
        <div className="position-absolute top-0 w-100">
          <p className="section-title">Food Guide</p>
          <div className="section-title-hr mx-auto"></div>
        </div>
        <div className="misc-facts row">
          <div className="col-6">
            <div>
              <img src={topLeft} alt={"Carrot"} />
              <p className="fact-title">Vegetables</p>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
            </div>
          </div>
          <div className="col-6">
            <div>
              <img src={topRight} alt={"grains"} />
              <p className="fact-title">Whole Grains</p>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
            </div>
          </div>
          <div className="col-6">
            <div>
              <img src={bottomLeft} alt={"Fruits"} />
              <p className="fact-title">Fruits</p>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
            </div>
          </div>
          <div className="col-6">
            <div>
              <img src={bottomRight} alt={"Healthy Protien"} />
              <p className="fact-title">Healthy Protien</p>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
