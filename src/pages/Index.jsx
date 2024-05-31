import { Box, Container, VStack, Text, Image, Heading, SimpleGrid, Link, Flex, Input, InputGroup, InputLeftElement, Select, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from "@chakra-ui/react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import { FaHome, FaBoxOpen, FaInfoCircle, FaEnvelope } from "react-icons/fa";

const categories = ["All", "Smartphones", "Laptops", "Smartwatches", "Headphones"];
const brands = ["All", "Brand A", "Brand B", "Brand C"];

const sampleProducts = [
  {
    id: 1,
    name: "Smartphone",
    price: "$699",
    image: "https://via.placeholder.com/150",
    category: "Smartphones",
    brand: "Brand A",
  },
  {
    id: 2,
    name: "Laptop",
    price: "$999",
    image: "https://via.placeholder.com/150",
    category: "Laptops",
    brand: "Brand B",
  },
  {
    id: 3,
    name: "Smartwatch",
    price: "$199",
    image: "https://via.placeholder.com/150",
    category: "Smartwatches",
    brand: "Brand C",
  },
  {
    id: 4,
    name: "Headphones",
    price: "$149",
    image: "https://via.placeholder.com/150",
    category: "Headphones",
    brand: "Brand A",
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  const filteredProducts = sampleProducts.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesBrand = selectedBrand === "All" || product.brand === selectedBrand;
    const matchesPrice = parseInt(product.price.replace("$", "")) >= priceRange[0] && parseInt(product.price.replace("$", "")) <= priceRange[1];
    return product.name.toLowerCase().includes(searchQuery.toLowerCase()) && matchesCategory && matchesBrand && matchesPrice;
  });
  return (
    <Container maxW="container.xl" p={0}>
      <Box bg="blue.800" color="white" py={4}>
        <Flex justify="space-between" align="center" px={4}>
          <Heading size="lg">ElectroShop</Heading>
          <Flex>
            <Link as={RouterLink} to="/" mx={2} display="flex" alignItems="center">
              <FaHome />
              <Text ml={1}>Home</Text>
            </Link>
            <Link as={RouterLink} to="/products" mx={2} display="flex" alignItems="center">
              <FaBoxOpen />
              <Text ml={1}>Products</Text>
            </Link>
            <InputGroup mx={2} width="300px">
              <InputLeftElement pointerEvents="none">
                <FaSearch color="gray.300" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Search products"
                value={searchQuery}
                onChange={handleSearchChange}
                bg="white"
                color="black"
              />
            </InputGroup>
            <Link as={RouterLink} to="/about" mx={2} display="flex" alignItems="center">
              <FaInfoCircle />
              <Text ml={1}>About Us</Text>
            </Link>
            <Link as={RouterLink} to="/contact" mx={2} display="flex" alignItems="center">
              <FaEnvelope />
              <Text ml={1}>Contact</Text>
            </Link>
          </Flex>
        </Flex>
      </Box>
      <Box py={10} textAlign="center">
        <Heading mb={6}>Welcome to ElectroShop</Heading>
        <Text fontSize="xl">Your one-stop shop for the latest electronics</Text>
      </Box>
      <Box py={10}>
        <Heading size="lg" mb={6} textAlign="center">Featured Products</Heading>
        <Flex justify="center" mb={6}>
          <Select placeholder="Select category" value={selectedCategory} onChange={handleCategoryChange} mx={2}>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </Select>
          <Select placeholder="Select brand" value={selectedBrand} onChange={handleBrandChange} mx={2}>
            {brands.map((brand) => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </Select>
          <Box mx={2}>
            <Text>Price Range: ${priceRange[0]} - ${priceRange[1]}</Text>
            <Slider
              aria-label="price-range-slider"
              defaultValue={[0, 1000]}
              min={0}
              max={1000}
              step={50}
              onChangeEnd={handlePriceChange}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb boxSize={6} index={0} />
              <SliderThumb boxSize={6} index={1} />
            </Slider>
          </Box>
        </Flex>
        <Heading size="lg" mb={6} textAlign="center">Featured Products</Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {filteredProducts.map((product) => (
            <Box key={product.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} textAlign="center">
              <Image src={product.image} alt={product.name} mx="auto" mb={4} />
              <Text fontWeight="bold" fontSize="xl">{product.name}</Text>
              <Text fontSize="lg" color="gray.600">{product.price}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Container>
  );
};

export default Index;