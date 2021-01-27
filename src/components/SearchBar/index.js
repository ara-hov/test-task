import { useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { SearchedMovie } from '../SearchedMovie';
import './style.css';

const useStyles = makeStyles((theme) => ({
  margin: {
    ['@media (max-width:768px)']: { // eslint-disable-line no-useless-computed-key
      margin: '8px auto',
      width:'100%',
    }
  },
  iconButton: {
    padding: 5,
  },
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  rootElement:{
    position: 'relative',
    ['@media (max-width:768px)']: { // eslint-disable-line no-useless-computed-key
      width: '80vw',
      margin: '8px auto',
    }
  },
  searchField:{
    width:'100%',
  }
}));

export const SearchBar = ({ searchDBTxt, handleSearchDB, searchedData, setSearchedData }) => {
  const classes = useStyles();
  const icon = (
    <IconButton className={classes.iconButton} aria-label="search">
      <SearchIcon />
    </IconButton>
  );

  const useOutsideAlerter = ref => {
    useEffect(() => {
      const handleClickOutside = event => {
        if (ref.current && !ref.current.contains(event.target)) {
          setSearchedData([]);
        }
      };
      
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <>
      <div className={classes.root}>
        <div className={classes.rootElement}>
          <TextField
            placeholder="Search MovieDB"
            className={classes.margin}
            InputProps={{
              startAdornment: icon,
            }}
            variant="outlined"
            type="search"
            value={searchDBTxt}
            onChange={handleSearchDB}
          />

          {searchedData.length ? (
            <div className="searched-data-cont" ref={wrapperRef}>
              {searchedData.map((movie, idx) => (
                <SearchedMovie movie={movie} key={idx + 1} />
              ))}
            </div>
          ) : null}
        </div>
        
        <Button variant="contained" color="primary" className='mobileButton'>
          Add to unwatched
        </Button>

      </div>
      <div className='search-bar-mobile'>
        <TextField
          id='standard-search'
          placeholder='Search My Movies'
          type='search'
          variant='outlined'
          className={classes.searchField}
        />
      </div>
    </>
  );
};
