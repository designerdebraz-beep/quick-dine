import hero_bg_img from "./hero_bg_img.png";
import default_restaurant_img from "./default_restaurant_Img.jpeg";
import membership_section_img from "./membership_section_img.png";
import {
    BeefIcon,
    Building2Icon,
    CroissantIcon,
    FishIcon,
    GlobeIcon,
    LeafIcon,
    MailIcon,
    Share2Icon,
    UtensilsCrossedIcon,
} from "lucide-react";

export const assets = {
    hero_bg_img,
    default_restaurant_img,
    membership_section_img,
};

export const footerSections = [
    {
        title: "COMPANY",
        links: [
            { label: "About Us", path: "/about" },
            { label: "Partner with Us", path: "/items/add" },
            { label: "Contact", path: "/contact" },
        ],
    },
    {
        title: "LEGAL",
        links: [
            { label: "Terms of Service", path: "/about" },
            { label: "Privacy Policy", path: "/about" },
            { label: "Cookies", path: "/about" },
        ],
    },
];

export const socialLinks = [
    { icon: GlobeIcon, href: "https://quedine.com" },
    { icon: Share2Icon, href: "https://twitter.com" },
    { icon: MailIcon, href: "mailto:support@quedine.com" },
];

export const bottomLinks = [
    { label: "Terms", path: "/about" },
    { label: "Privacy", path: "/about" },
];

export const cuisines = [
    { name: "Italian", icon: UtensilsCrossedIcon, label: "ITALIAN" },
    { name: "Japanese", icon: FishIcon, label: "SUSHI" },
    { name: "French", icon: CroissantIcon, label: "FRENCH" },
    { name: "Rooftop", icon: Building2Icon, label: "ROOFTOP" },
    { name: "Steakhouse", icon: BeefIcon, label: "STEAKHOUSE" },
    { name: "Vegetarian", icon: LeafIcon, label: "VEGETARIAN" },
];
