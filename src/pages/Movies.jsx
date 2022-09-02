import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import { getGenres, fetchMovies } from '../store';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import NotAvaliable from '../components/NotAvaliable';
import Slider from '../components/Slider';
import SelectGenre from '../components/SelectGenre';

export default function Movies() {
  const [isScrolled, setisScrolled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);

  useEffect(() => {
    dispatch(getGenres());
  }, [genres])

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ type: "movies" }));
    }
  }, [genresLoaded])


  window.onscroll = () => {
    setisScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
    //   navigate("/");
    }
  });
  return (
    <Container>
        <div className="navbar">
            <Navbar isScrolled={isScrolled}/>
        </div>
        <SelectGenre genres={genres} type="movie" />
        <div className="data">
            {movies.length ? <Slider  movies={movies}/>:<NotAvaliable/>}
        </div>
    </Container>
  )
}
const Container = styled.div`
    margin-top: 4rem;
`;