import React, { useState, useEffect } from 'react';
import { 
  ShoppingBagIcon, 
  AcademicCapIcon, 
  BriefcaseIcon, 
  GlobeAltIcon, 
  MapPinIcon, 
  CalendarIcon, 
  TagIcon, 
  ArrowPathIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

const Deals = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedDeal, setExpandedDeal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deals, setDeals] = useState([
    {
      id: 1,
      title: 'Walmart Student Discount Program',
      description: '10% off on electronics and school supplies with valid student ID',
      store: 'Walmart',
      category: 'student',
      location: 'Ontario',
      expiryDate: '2025-12-31',
      image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      details: 'Show your valid student ID at checkout to receive 10% off on all electronics and school supplies. This offer is valid at all Walmart locations in Ontario. Cannot be combined with other offers.',
      link: 'https://www.walmart.ca/en/student-discounts'
    },
    {
      id: 2,
      title: 'No Frills Newcomer Welcome Package',
      description: 'Free welcome package with $50 purchase for new immigrants',
      store: 'No Frills',
      category: 'immigrant',
      location: 'Ontario',
      expiryDate: '2025-12-31',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      details: 'New immigrants can receive a free welcome package with essential items when they make a purchase of $50 or more. Show your immigration documents at the customer service desk to receive your package. Valid at all No Frills locations in Ontario.',
      link: 'https://www.nofrills.ca/newcomer-welcome'
    },
    {
      id: 3,
      title: 'Costco Executive Membership',
      description: '2% cashback on all purchases for international students',
      store: 'Costco',
      category: 'student',
      location: 'Ontario',
      expiryDate: '2025-12-31',
      image: 'https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      details: 'International students can get an Executive Membership with 2% cashback on all purchases. Show your student ID and passport at the membership desk to sign up. The annual fee is $120, but you can earn up to $1,000 in cashback rewards each year.',
      link: 'https://www.costco.ca/executive-membership'
    },
    {
      id: 4,
      title: 'Food Basics Student Discount',
      description: '5% off on all groceries with valid student ID',
      store: 'Food Basics',
      category: 'student',
      location: 'Ontario',
      expiryDate: '2025-12-31',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      details: 'Show your valid student ID at checkout to receive 5% off on all groceries. This offer is valid at all Food Basics locations in Ontario. Cannot be combined with other offers.',
      link: 'https://www.foodbasics.ca/student-discounts'
    },
    {
      id: 5,
      title: 'RBC Newcomer Advantage',
      description: 'No monthly fees for 1 year on select accounts for new immigrants',
      store: 'RBC',
      category: 'immigrant',
      location: 'Ontario',
      expiryDate: '2025-12-31',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      details: 'New immigrants can open a select RBC account with no monthly fees for 1 year. Visit any RBC branch with your immigration documents to take advantage of this offer. After 1 year, regular fees will apply.',
      link: 'https://www.rbcroyalbank.com/newcomers.html'
    },
    {
      id: 6,
      title: 'CIBC Student Banking',
      description: 'Free banking with unlimited transactions for students',
      store: 'CIBC',
      category: 'student',
      location: 'Ontario',
      expiryDate: '2025-12-31',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      details: 'Students can open a CIBC Smart Account with unlimited transactions and no monthly fees. Show your valid student ID at any CIBC branch to sign up. This offer is valid for the duration of your studies.',
      link: 'https://www.cibc.com/en/personal-banking/accounts/student-account.html'
    },
    {
      id: 7,
      title: 'TD New to Canada Banking',
      description: 'No monthly fees for 6 months on select accounts for new immigrants',
      store: 'TD',
      category: 'immigrant',
      location: 'Ontario',
      expiryDate: '2025-12-31',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      details: 'New immigrants can open a select TD account with no monthly fees for 6 months. Visit any TD branch with your immigration documents to take advantage of this offer. After 6 months, regular fees will apply.',
      link: 'https://www.td.com/ca/personal-banking/new-to-canada/'
    },
    {
      id: 8,
      title: 'Scotia Student Banking',
      description: 'Free banking with unlimited transactions for students',
      store: 'Scotia',
      category: 'student',
      location: 'Ontario',
      expiryDate: '2025-12-31',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      details: 'Students can open a Scotia Student Banking Advantage Plan with unlimited transactions and no monthly fees. Show your valid student ID at any Scotia branch to sign up. This offer is valid for the duration of your studies.',
      link: 'https://www.scotiabank.com/ca/en/personal/banking/accounts/student-banking.html'
    },
    {
      id: 9,
      title: 'BMO NewStart Program',
      description: 'Free banking with unlimited transactions for new immigrants',
      store: 'BMO',
      category: 'immigrant',
      location: 'Ontario',
      expiryDate: '2025-12-31',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      details: 'New immigrants can open a BMO NewStart Account with unlimited transactions and no monthly fees for 1 year. Visit any BMO branch with your immigration documents to take advantage of this offer. After 1 year, regular fees will apply.',
      link: 'https://www.bmo.com/main/personal/bank-accounts/new-to-canada'
    },
    {
      id: 10,
      title: 'HSBC Newcomers Program',
      description: 'Free banking with unlimited transactions for new immigrants',
      store: 'HSBC',
      category: 'immigrant',
      location: 'Ontario',
      expiryDate: '2025-12-31',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      details: 'New immigrants can open an HSBC Newcomers Account with unlimited transactions and no monthly fees for 1 year. Visit any HSBC branch with your immigration documents to take advantage of this offer. After 1 year, regular fees will apply.',
      link: 'https://www.hsbc.ca/newcomers'
    },
    {
      id: 11,
      title: 'TTC Student Pass',
      description: 'Discounted monthly pass for students',
      store: 'TTC',
      category: 'student',
      location: 'Toronto',
      expiryDate: '2025-12-31',
      image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      details: 'Students can purchase a discounted monthly TTC pass for $116.75 (regular price is $156.00). Show your valid student ID at any TTC station to purchase this pass. This offer is valid for the duration of your studies.',
      link: 'https://www.ttc.ca/fares-and-passes'
    },
    {
      id: 12,
      title: 'GO Transit Student Discount',
      description: 'Discounted monthly pass for students',
      store: 'GO Transit',
      category: 'student',
      location: 'Ontario',
      expiryDate: '2025-12-31',
      image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      details: 'Students can purchase a discounted monthly GO Transit pass. Show your valid student ID at any GO Transit station to purchase this pass. This offer is valid for the duration of your studies.',
      link: 'https://www.gotransit.com/en/trip-planning/fares'
    },
    {
      id: 13,
      title: 'Amazon Student Prime',
      description: 'Free 6-month trial of Amazon Prime for students',
      store: 'Amazon',
      category: 'student',
      location: 'Canada',
      expiryDate: '2025-12-31',
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      details: 'Students can get a free 6-month trial of Amazon Prime. After the trial, you can continue your membership for $4.99 per month (regular price is $9.99 per month). Sign up with your valid student email address to take advantage of this offer.',
      link: 'https://www.amazon.ca/prime/student'
    },
    {
      id: 14,
      title: 'Spotify Student Premium',
      description: 'Discounted Spotify Premium for students',
      store: 'Spotify',
      category: 'student',
      location: 'Canada',
      expiryDate: '2025-12-31',
      image: 'https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      details: 'Students can get Spotify Premium for $4.99 per month (regular price is $9.99 per month). Sign up with your valid student email address to take advantage of this offer. This offer is valid for the duration of your studies.',
      link: 'https://www.spotify.com/ca-en/student/'
    },
    {
      id: 15,
      title: 'Apple Education Pricing',
      description: 'Discounted Apple products for students',
      store: 'Apple',
      category: 'student',
      location: 'Canada',
      expiryDate: '2025-12-31',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      details: 'Students can get discounted Apple products through the Apple Education Store. Show your valid student ID at checkout to take advantage of this offer. This offer is valid for the duration of your studies.',
      link: 'https://www.apple.com/ca-edu/store'
    },
    {
      id: 16,
      title: 'Microsoft Student Discount',
      description: 'Discounted Microsoft products for students',
      store: 'Microsoft',
      category: 'student',
      location: 'Canada',
      expiryDate: '2025-12-31',
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      details: 'Students can get discounted Microsoft products through the Microsoft Education Store. Sign up with your valid student email address to take advantage of this offer. This offer is valid for the duration of your studies.',
      link: 'https://www.microsoft.com/en-ca/education'
    },
    {
      id: 17,
      title: 'Adobe Student Discount',
      description: 'Discounted Adobe Creative Cloud for students',
      store: 'Adobe',
      category: 'student',
      location: 'Canada',
      expiryDate: '2025-12-31',
      image: 'https://images.unsplash.com/photo-1614036634955-ae5e90f9b9eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      details: 'Students can get Adobe Creative Cloud for $19.99 per month (regular price is $52.99 per month). Sign up with your valid student email address to take advantage of this offer. This offer is valid for the duration of your studies.',
      link: 'https://www.adobe.com/education/students.html'
    },
    {
      id: 18,
      title: 'Gym Membership Student Discount',
      description: 'Discounted gym memberships for students',
      store: 'GoodLife Fitness',
      category: 'student',
      location: 'Ontario',
      expiryDate: '2025-12-31',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      details: 'Students can get a discounted gym membership at GoodLife Fitness. Show your valid student ID at any GoodLife Fitness location to take advantage of this offer. This offer is valid for the duration of your studies.',
      link: 'https://www.goodlifefitness.com/student-membership'
    },
    {
      id: 19,
      title: 'Cineplex Student Discount',
      description: 'Discounted movie tickets for students',
      store: 'Cineplex',
      category: 'student',
      location: 'Canada',
      expiryDate: '2025-12-31',
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      details: 'Students can get discounted movie tickets at Cineplex. Show your valid student ID at the box office to take advantage of this offer. This offer is valid for the duration of your studies.',
      link: 'https://www.cineplex.com/student-discounts'
    },
    {
      id: 20,
      title: 'Shoppers Drug Mart Student Discount',
      description: '10% off on all purchases with valid student ID',
      store: 'Shoppers Drug Mart',
      category: 'student',
      location: 'Ontario',
      expiryDate: '2025-12-31',
      image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      details: 'Show your valid student ID at checkout to receive 10% off on all purchases. This offer is valid at all Shoppers Drug Mart locations in Ontario. Cannot be combined with other offers.',
      link: 'https://www.shoppersdrugmart.ca/student-discounts'
    },
    {
      id: 21,
      title: 'Rexall Student Discount',
      description: '10% off on all purchases with valid student ID',
      store: 'Rexall',
      category: 'student',
      location: 'Ontario',
      expiryDate: '2025-12-31',
      image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      details: 'Show your valid student ID at checkout to receive 10% off on all purchases. This offer is valid at all Rexall locations in Ontario. Cannot be combined with other offers.',
      link: 'https://www.rexall.ca/student-discounts'
    },
    {
      id: 22,
      title: 'Loblaws Student Discount',
      description: '10% off on all purchases with valid student ID',
      store: 'Loblaws',
      category: 'student',
      location: 'Ontario',
      expiryDate: '2025-12-31',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      details: 'Show your valid student ID at checkout to receive 10% off on all purchases. This offer is valid at all Loblaws locations in Ontario. Cannot be combined with other offers.',
      link: 'https://www.loblaws.ca/student-discounts'
    },
    {
      id: 23,
      title: 'Metro Student Discount',
      description: '10% off on all purchases with valid student ID',
      store: 'Metro',
      category: 'student',
      location: 'Ontario',
      expiryDate: '2025-12-31',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      details: 'Show your valid student ID at checkout to receive 10% off on all purchases. This offer is valid at all Metro locations in Ontario. Cannot be combined with other offers.',
      link: 'https://www.metro.ca/student-discounts'
    },
    {
      id: 24,
      title: 'Sobeys Student Discount',
      description: '10% off on all purchases with valid student ID',
      store: 'Sobeys',
      category: 'student',
      location: 'Ontario',
      expiryDate: '2025-12-31',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      details: 'Show your valid student ID at checkout to receive 10% off on all purchases. This offer is valid at all Sobeys locations in Ontario. Cannot be combined with other offers.',
      link: 'https://www.sobeys.com/student-discounts'
    },
    {
      id: 25,
      title: 'FreshCo Student Discount',
      description: '10% off on all purchases with valid student ID',
      store: 'FreshCo',
      category: 'student',
      location: 'Ontario',
      expiryDate: '2025-12-31',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      details: 'Show your valid student ID at checkout to receive 10% off on all purchases. This offer is valid at all FreshCo locations in Ontario. Cannot be combined with other offers.',
      link: 'https://www.freshco.com/student-discounts'
    },
    {
      id: 26,
      title: 'Fortinos Student Discount',
      description: '10% off on all purchases with valid student ID',
      store: 'Fortinos',
      category: 'student',
      location: 'Ontario',
      expiryDate: '2025-12-31',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      details: 'Show your valid student ID at checkout to receive 10% off on all purchases. This offer is valid at all Fortinos locations in Ontario. Cannot be combined with other offers.',
      link: 'https://www.fortinos.ca/student-discounts'
    },
    {
      id: 27,
      title: 'Zehrs Student Discount',
      description: '10% off on all purchases with valid student ID',
      store: 'Zehrs',
      category: 'student',
      location: 'Ontario',
      expiryDate: '2025-12-31',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      details: 'Show your valid student ID at checkout to receive 10% off on all purchases. This offer is valid at all Zehrs locations in Ontario. Cannot be combined with other offers.',
      link: 'https://www.zehrs.ca/student-discounts'
    },
    {
      id: 28,
      title: 'Real Canadian Superstore Student Discount',
      description: '10% off on all purchases with valid student ID',
      store: 'Real Canadian Superstore',
      category: 'student',
      location: 'Ontario',
      expiryDate: '2025-12-31',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      details: 'Show your valid student ID at checkout to receive 10% off on all purchases. This offer is valid at all Real Canadian Superstore locations in Ontario. Cannot be combined with other offers.',
      link: 'https://www.realcanadiansuperstore.ca/student-discounts'
    },
    {
      id: 29,
      title: 'Your Independent Grocer Student Discount',
      description: '10% off on all purchases with valid student ID',
      store: 'Your Independent Grocer',
      category: 'student',
      location: 'Ontario',
      expiryDate: '2025-12-31',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      details: 'Show your valid student ID at checkout to receive 10% off on all purchases. This offer is valid at all Your Independent Grocer locations in Ontario. Cannot be combined with other offers.',
      link: 'https://www.yourindependentgrocer.ca/student-discounts'
    },
    {
      id: 30,
      title: 'Valu-Mart Student Discount',
      description: '10% off on all purchases with valid student ID',
      store: 'Valu-Mart',
      category: 'student',
      location: 'Ontario',
      expiryDate: '2025-12-31',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      details: 'Show your valid student ID at checkout to receive 10% off on all purchases. This offer is valid at all Valu-Mart locations in Ontario. Cannot be combined with other offers.',
      link: 'https://www.valumart.ca/student-discounts'
    },
    {
      id: 31,
      title: 'Canadian Tire Student Discount',
      description: '10% off on all purchases with valid student ID',
      store: 'Canadian Tire',
      category: 'student',
      location: 'Ontario',
      expiryDate: '2025-12-31',
      image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      details: 'Show your valid student ID at checkout to receive 10% off on all purchases. This offer is valid at all Canadian Tire locations in Ontario. Cannot be combined with other offers.',
      link: 'https://www.canadiantire.ca/student-discounts'
    },
    {
      id: 32,
      title: 'Home Depot Student Discount',
      description: '10% off on all purchases with valid student ID',
      store: 'Home Depot',
      category: 'student',
      location: 'Ontario',
      expiryDate: '2025-12-31',
      image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      details: 'Show your valid student ID at checkout to receive 10% off on all purchases. This offer is valid at all Home Depot locations in Ontario. Cannot be combined with other offers.',
      link: 'https://www.homedepot.ca/student-discounts'
    },
    {
      id: 33,
      title: 'Rona Student Discount',
      description: '10% off on all purchases with valid student ID',
      store: 'Rona',
      category: 'student',
      location: 'Ontario',
      expiryDate: '2025-12-31',
      image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      details: 'Show your valid student ID at checkout to receive 10% off on all purchases. This offer is valid at all Rona locations in Ontario. Cannot be combined with other offers.',
      link: 'https://www.rona.ca/student-discounts'
    },
    {
      id: 34,
      title: 'Lowes Student Discount',
      description: '10% off on all purchases with valid student ID',
      store: 'Lowes',
      category: 'student',
      location: 'Ontario',
      expiryDate: '2025-12-31',
      image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      details: 'Show your valid student ID at checkout to receive 10% off on all purchases. This offer is valid at all Lowes locations in Ontario. Cannot be combined with other offers.',
      link: 'https://www.lowes.ca/student-discounts'
    },
    {
      id: 35,
      title: 'Best Buy Student Discount',
      description: '10% off on all purchases with valid student ID',
      store: 'Best Buy',
      category: 'student',
      location: 'Ontario',
      expiryDate: '2025-12-31',
      image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      details: 'Show your valid student ID at checkout to receive 10% off on all purchases. This offer is valid at all Best Buy locations in Ontario. Cannot be combined with other offers.',
      link: 'https://www.bestbuy.ca/student-discounts'
    },
    {
      id: 36,
      title: 'Staples Student Discount',
      description: '10% off on all purchases with valid student ID',
      store: 'Staples',
      category: 'student',
      location: 'Ontario',
      expiryDate: '2025-12-31',
      image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      details: 'Show your valid student ID at checkout to receive 10% off on all purchases. This offer is valid at all Staples locations in Ontario. Cannot be combined with other offers.',
      link: 'https://www.staples.ca/student-discounts'
    },
    {
      id: 37,
      title: 'Indigo Student Discount',
      description: '10% off on all purchases with valid student ID',
      store: 'Indigo',
      category: 'student',
      location: 'Ontario',
      expiryDate: '2025-12-31',
      image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      details: 'Show your valid student ID at checkout to receive 10% off on all purchases. This offer is valid at all Indigo locations in Ontario. Cannot be combined with other offers.',
      link: 'https://www.indigo.ca/student-discounts'
    },
    {
      id: 38,
      title: 'Chapters Student Discount',
      description: '10% off on all purchases with valid student ID',
      store: 'Chapters',
      category: 'student',
      location: 'Ontario',
      expiryDate: '2025-12-31',
      image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      details: 'Show your valid student ID at checkout to receive 10% off on all purchases. This offer is valid at all Chapters locations in Ontario. Cannot be combined with other offers.',
      link: 'https://www.chapters.indigo.ca/student-discounts'
    },
    {
      id: 39,
      title: 'Sport Chek Student Discount',
      description: '10% off on all purchases with valid student ID',
      store: 'Sport Chek',
      category: 'student',
      location: 'Ontario',
      expiryDate: '2025-12-31',
      image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      details: 'Show your valid student ID at checkout to receive 10% off on all purchases. This offer is valid at all Sport Chek locations in Ontario. Cannot be combined with other offers.',
      link: 'https://www.sportchek.ca/student-discounts'
    },
    {
      id: 40,
      title: 'Atmosphere Student Discount',
      description: '10% off on all purchases with valid student ID',
      store: 'Atmosphere',
      category: 'student',
      location: 'Ontario',
      expiryDate: '2025-12-31',
      image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      details: 'Show your valid student ID at checkout to receive 10% off on all purchases. This offer is valid at all Atmosphere locations in Ontario. Cannot be combined with other offers.',
      link: 'https://www.atmosphere.ca/student-discounts'
    }
  ]);

  const [filteredDeals, setFilteredDeals] = useState(deals);

  useEffect(() => {
    // Filter deals based on active tab and search term
    let filtered = deals;
    
    if (activeTab !== 'all') {
      filtered = filtered.filter(deal => deal.category === activeTab);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(deal => 
        deal.title.toLowerCase().includes(term) || 
        deal.description.toLowerCase().includes(term) || 
        deal.store.toLowerCase().includes(term) ||
        deal.location.toLowerCase().includes(term)
      );
    }
    
    setFilteredDeals(filtered);
  }, [activeTab, searchTerm, deals]);

  const handleRefresh = () => {
    setLoading(true);
    // Simulate API call to refresh deals
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const toggleDealExpansion = (id) => {
    if (expandedDeal === id) {
      setExpandedDeal(null);
    } else {
      setExpandedDeal(id);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-CA', options);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Deals & Discounts</h1>
              <p className="text-sm text-gray-500 mt-1">Find the best deals and discounts in Ontario, Canada</p>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                onClick={handleRefresh}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <ArrowPathIcon className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Search deals by title, store, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('all')}
                className={`${
                  activeTab === 'all'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                All Deals
              </button>
              <button
                onClick={() => setActiveTab('student')}
                className={`${
                  activeTab === 'student'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <AcademicCapIcon className="h-5 w-5 mr-1" />
                Student
              </button>
              <button
                onClick={() => setActiveTab('immigrant')}
                className={`${
                  activeTab === 'immigrant'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <GlobeAltIcon className="h-5 w-5 mr-1" />
                Newcomers
              </button>
              <button
                onClick={() => setActiveTab('worker')}
                className={`${
                  activeTab === 'worker'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <BriefcaseIcon className="h-5 w-5 mr-1" />
                Workers
              </button>
            </nav>
          </div>

          {/* Deals Grid */}
          {filteredDeals.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBagIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No deals found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDeals.map((deal) => (
                <div key={deal.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={deal.image}
                      alt={deal.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                        {deal.store}
                      </span>
                      <span className="inline-flex items-center text-xs text-gray-500">
                        <MapPinIcon className="h-4 w-4 mr-1" />
                        {deal.location}
                      </span>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">{deal.title}</h3>
                    <p className="text-sm text-gray-500 mb-3">{deal.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center text-xs text-gray-500">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        Expires: {formatDate(deal.expiryDate)}
                      </span>
                      <button
                        onClick={() => toggleDealExpansion(deal.id)}
                        className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500"
                      >
                        {expandedDeal === deal.id ? (
                          <>
                            <ChevronUpIcon className="h-4 w-4 mr-1" />
                            Less
                          </>
                        ) : (
                          <>
                            <ChevronDownIcon className="h-4 w-4 mr-1" />
                            More
                          </>
                        )}
                      </button>
                    </div>
                    
                    {expandedDeal === deal.id && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-700 mb-4">{deal.details}</p>
                        <a
                          href={deal.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                          <TagIcon className="h-4 w-4 mr-2" />
                          Get This Deal
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Deals; 