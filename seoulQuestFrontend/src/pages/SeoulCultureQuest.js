import { useState, useEffect } from "react";

import {
  ShoppingBagIcon,
  UserIcon,
  LogInIcon,
  LogOutIcon,
  SearchIcon,
  MenuIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";

import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/Avatar"; // Use named imports
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "../components/ui/NavigationMenu";
import Carousel, {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/Carousel";

export default function SeoulCultureQuest() {
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const slides = [
    {
      title: "Discover Seoul's Soul",
      image:
        "https://cdn.pixabay.com/photo/2020/12/14/19/40/palace-5831869_1280.jpg",
    },
    {
      title: "Experience Timeless Traditions",
      image:
        "https://cdn.pixabay.com/photo/2015/05/02/00/57/aluminous-749358_1280.jpg",
    },
    {
      title: "Embrace Modern Korea",
      image:
        "https://cdn.pixabay.com/photo/2023/03/12/07/50/samulnori-7846017_1280.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Futuristic Navbar: Transparent with blur effect
      <nav className="fixed top-0 left-0 right-0 bg-white bg-opacity-70 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <span className="text-2xl font-semibold tracking-wide text-gray-900">
                Seoul<span className="text-orange-500">Culture</span>Quest
              </span>
            </div>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">
                    Experiences
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-rose-500 to-rose-700 p-6 no-underline outline-none focus:shadow-md"
                            href="/"
                          >
                            <div className="mt-4 text-lg font-medium text-white">
                              Discover Seoul
                            </div>
                            <p className="text-sm leading-tight text-white/90">
                              Immerse yourself in the heart of Korea's capital
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100"
                            href="/"
                          >
                            <div className="text-sm font-medium leading-none">
                              Palace Tours
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-slate-500">
                              Step back in time at Seoul's grand palaces
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100"
                            href="/"
                          >
                            <div className="text-sm font-medium leading-none">
                              Tea Ceremonies
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-slate-500">
                              Experience the tranquility of Korean tea culture
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100"
                            href="/"
                          >
                            <div className="text-sm font-medium leading-none">
                              K-Culture Workshops
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-slate-500">
                              Dive into the world of K-pop and modern Korean
                              culture
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className="text-sm font-medium" href="/">
                    Artisan Crafts
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className="text-sm font-medium" href="/">
                    About
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className="text-sm font-medium" href="/">
                    Contact
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-900"
              >
                <ShoppingBagIcon className="h-5 w-5" />
              </Button>
              {isLoggedIn ? (
                <>
                  <Button
                    href="/login"
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsLoggedIn(false)}
                    className="text-gray-600 hover:text-gray-900 font-medium"
                  >
                    <LogOutIcon className="h-5 w-5 mr-2" />
                    Log out
                  </Button>
                  <Avatar>
                    <AvatarImage
                      src="/placeholder.svg?height=32&width=32"
                      alt="User"
                    />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsLoggedIn(true)}
                    className="text-gray-600 hover:text-gray-900 font-medium"
                  >
                    <LogInIcon className="h-5 w-5 mr-2" />
                    Log in
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-orange-600 hover:bg-rose-700 text-white font-medium"
                  >
                    <UserIcon className="h-5 w-5 mr-2" />
                    Sign up
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav> */}

      {/* Hero Section with Futuristic Slideshow */}
      <section className="pt-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Carousel className="w-full aspect-[21/9] rounded-lg overflow-hidden">
            <CarouselContent>
              {slides.map((slide, index) => (
                <CarouselItem key={index}>
                  <div className="relative w-full h-full">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20">
                      <h1 className="absolute top-20 left-1/2 transform -translate-x-1/2 text-5xl font-bold text-white tracking-wide text-center">
                        {slide.title}
                      </h1>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          {/* Futuristic search bar: Floating design with glow effect */}
          <div className="mt-8 flex justify-center">
            <div className="flex w-full max-w-2xl bg-white rounded-full shadow-lg overflow-hidden border border-gray-200">
              <Input
                placeholder="Search experiences..."
                className="flex-grow border-0 focus:ring-0 text-lg py-6 px-6"
              />
              <Button className="bg-orange-800 hover:bg-rose-700 text-white font-medium tracking-wide py-6 px-6 rounded-r-full">
                <SearchIcon className="h-5 w-5 mr-2" />
                Explore
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Experiences Section: Modern Grid Layout */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-4xl font-bold text-center text-gray-900 tracking-wide">
            Curated Cultural Experiences
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Royal Palace Moonlight Tour",
                price: "₩120,000",
                image:
                  "https://cdn.pixabay.com/photo/2023/10/10/11/28/star-trails-8306233_1280.jpg",
              },
              {
                title: "Traditional Tea Ceremony",
                price: "₩85,000",
                image:
                  "https://cdn.pixabay.com/photo/2023/02/22/19/13/tea-ceremony-7807230_1280.jpg",
              },
              {
                title: "Hansik Cooking Class",
                price: "₩95,000",
                image:
                  "https://cdn.pixabay.com/photo/2021/05/07/06/55/market-6235296_1280.jpg",
              },
            ].map((experience, index) => (
              <Card
                key={index}
                className="overflow-hidden transition-all duration-300 hover:shadow-xl border-0 bg-white group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={experience.image}
                    alt={experience.title}
                    className="object-cover w-full h-64 transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Button className="bg-white text-gray-900 hover:bg-gray-100">
                      Learn More
                    </Button>
                  </div>
                </div>
                <CardHeader className="text-center">
                  <CardTitle className="text-xl font-semibold tracking-wide text-gray-900">
                    {experience.title}
                  </CardTitle>
                  <CardDescription className="font-medium text-rose-600">
                    {experience.price} per person
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium tracking-wide">
                    Reserve Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Artisan Crafts Section: Elegant Masonry Layout */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-4xl font-bold text-center text-gray-900 tracking-wide">
            Artisan Treasures
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                name: "Handcrafted Celadon Vase",
                price: "₩320,000",
                image:
                  "https://cdn.pixabay.com/photo/2014/03/03/01/00/jugs-278647_1280.jpg",
              },
              {
                name: "Traditional Hanbok Set",
                price: "₩580,000",
                image:
                  "https://cdn.pixabay.com/photo/2017/08/06/00/44/korean-2587180_1280.jpg",
              },
              {
                name: "Premium Ginseng Collection",
                price: "₩250,000",
                image:
                  "https://cdn.pixabay.com/photo/2016/11/22/03/47/ginseng-1848303_1280.jpg",
              },
              {
                name: "Hanji Paper Art Piece",
                price: "₩180,000",
                image:
                  "https://cdn.pixabay.com/photo/2021/05/16/05/18/gyeongbokgung-6257203_1280.jpg",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="overflow-hidden transition-all duration-300 hover:shadow-xl border-0 bg-white group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="text-center">
                      <CardTitle className="text-lg font-semibold tracking-wide text-white">
                        {item.name}
                      </CardTitle>
                      <CardDescription className="font-medium text-rose-400">
                        {item.price}
                      </CardDescription>
                      <Button
                        variant="outline"
                        className="mt-2 text-white hover:text-gray-900 hover:bg-white font-medium tracking-wide border-white"
                      >
                        Add to Collection
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section: Modern Carousel */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-4xl font-bold text-center text-gray-900 tracking-wide">
            Guest Reflections
          </h2>
          <Carousel className="w-full">
            <CarouselContent>
              {[
                {
                  name: "Emily C.",
                  avatar: "/placeholder.svg?height=100&width=100",
                  text: "The Palace Moonlight Tour was absolutely enchanting. It felt like a journey through time, allowing me to experience the majesty of Korean royalty.",
                },
                {
                  name: "David L.",
                  avatar: "/placeholder.svg?height=100&width=100",
                  text: "The K-Pop dance workshop exceeded all my expectations. The instructors were world-class, and I left feeling like a true K-Pop star!",
                },
              ].map((testimonial, index) => (
                <CarouselItem key={index}>
                  <Card className="bg-gray-50 border-0 shadow-sm">
                    <CardContent className="flex flex-col items-center gap-4 pt-6">
                      <Avatar className="w-16 h-16">
                        <AvatarImage
                          src={testimonial.avatar}
                          alt={testimonial.name}
                        />
                        <AvatarFallback>
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-center">
                        <CardTitle className="mb-2 font-semibold tracking-wide text-gray-900">
                          {testimonial.name}
                        </CardTitle>
                        <CardDescription className="font-medium italic text-gray-600">
                          "{testimonial.text}"
                        </CardDescription>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Footer with Newsletter Signup: Modern Gradient Design */}
      <footer className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-2xl font-bold tracking-wide mb-4">
                Seoul Culture Quest
              </h3>
              <p className="font-medium">
                Unveiling the essence of Korean heritage
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold tracking-wide mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2 font-medium">
                <li>
                  <a href="#" className="hover:text-rose-400 transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-rose-400 transition-colors">
                    Experiences
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-rose-400 transition-colors">
                    Artisan Crafts
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-rose-400 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold tracking-wide mb-4">
                Stay Connected
              </h4>
              <p className="mb-4 font-medium">
                Subscribe for exclusive offers and cultural insights
              </p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/30 text-white placeholder-white/70"
                />
                <Button className="bg-orange-700 hover:bg-rose-700 text-white font-medium tracking-wide px-6">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <p className="font-medium">
              &copy; 2024 Seoul Culture Quest. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
