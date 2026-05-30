import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge, Spinner, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJoke, setCategory, setType, clearError } from '../redux/actions/jokeActions';
import '../styles/JokeGenerator.css';

function JokeGenerator() {
  const dispatch = useDispatch();
  const { currentJoke, jokes, loading, error, category, type } = useSelector((state) => state.joke);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favoriteJokes');
    return saved ? JSON.parse(saved) : [];
  });

  const categories = ['Any', 'General', 'Knock-knock', 'Programming'];
  const types = ['any', 'single', 'twopart'];

  const handleFetchJoke = () => {
    dispatch(clearError());
    dispatch(fetchJoke(category, type));
  };

  const handleCategoryChange = (e) => {
    dispatch(setCategory(e.target.value));
  };

  const handleTypeChange = (e) => {
    dispatch(setType(e.target.value));
  };

  const handleAddFavorite = () => {
    if (currentJoke && !favorites.find(j => j.id === currentJoke.id)) {
      const newFavorites = [...favorites, currentJoke];
      setFavorites(newFavorites);
      localStorage.setItem('favoriteJokes', JSON.stringify(newFavorites));
    }
  };

  const handleRemoveFavorite = (jokeId) => {
    const newFavorites = favorites.filter(j => j.id !== jokeId);
    setFavorites(newFavorites);
    localStorage.setItem('favoriteJokes', JSON.stringify(newFavorites));
  };

  const handleShareJoke = () => {
    if (currentJoke) {
      const jokeText = currentJoke.type === 'single' 
        ? currentJoke.joke 
        : `${currentJoke.setup} - ${currentJoke.delivery}`;
      
      if (navigator.share) {
        navigator.share({
          title: 'Check out this joke!',
          text: jokeText,
        });
      } else {
        navigator.clipboard.writeText(jokeText);
        alert('Joke copied to clipboard!');
      }
    }
  };

  const isFavorite = currentJoke && favorites.find(j => j.id === currentJoke.id);

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h2>😂 Random Joke Generator</h2>
          <p className="text-muted">Get random jokes from various categories</p>
        </Col>
      </Row>

      {/* Controls */}
      <Row className="mb-4">
        <Col md={6}>
          <Card className="p-4 shadow-sm">
            <h5>Customize Your Joke</h5>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select value={category} onChange={handleCategoryChange}>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select value={type} onChange={handleTypeChange}>
                {types.map((t) => (
                  <option key={t} value={t}>
                    {t === 'any' ? 'Any' : t === 'single' ? 'Single Line' : 'Two Part'}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button
              variant="primary"
              onClick={handleFetchJoke}
              disabled={loading}
              className="w-100"
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Getting Joke...
                </>
              ) : (
                '🎲 Get Random Joke'
              )}
            </Button>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="p-4 shadow-sm">
            <h5>Statistics</h5>
            <div className="d-flex justify-content-around">
              <div className="text-center">
                <h6 className="text-muted">Total Jokes</h6>
                <h3>{jokes.length}</h3>
              </div>
              <div className="text-center">
                <h6 className="text-muted">Favorites</h6>
                <h3>{favorites.length}</h3>
              </div>
              <div className="text-center">
                <h6 className="text-muted">Category</h6>
                <h4>
                  <Badge bg="info">{category}</Badge>
                </h4>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Error Alert */}
      {error && (
        <Row className="mb-4">
          <Col>
            <Alert variant="danger" dismissible>
              {error}
            </Alert>
          </Col>
        </Row>
      )}

      {/* Current Joke Display */}
      {currentJoke && (
        <Row className="mb-4">
          <Col md={8}>
            <Card className="p-4 shadow-lg joke-card">
              <Card.Body>
                {currentJoke.type === 'single' ? (
                  <p className="joke-text">{currentJoke.joke}</p>
                ) : (
                  <>
                    <p className="joke-setup">{currentJoke.setup}</p>
                    <p className="joke-delivery">{currentJoke.delivery}</p>
                  </>
                )}
              </Card.Body>
              <Card.Footer className="bg-light">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <Badge bg="secondary" className="me-2">
                      {currentJoke.category}
                    </Badge>
                    <Badge bg="info">{currentJoke.type}</Badge>
                  </div>
                  <div>
                    <Button
                      variant={isFavorite ? 'danger' : 'outline-danger'}
                      size="sm"
                      onClick={isFavorite ? () => handleRemoveFavorite(currentJoke.id) : handleAddFavorite}
                      className="me-2"
                    >
                      {isFavorite ? '❤️ Remove' : '🤍 Favorite'}
                    </Button>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={handleShareJoke}
                    >
                      📤 Share
                    </Button>
                  </div>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      )}

      {/* Favorites Section */}
      {favorites.length > 0 && (
        <Row>
          <Col>
            <h3 className="mb-4">❤️ Your Favorite Jokes</h3>
            {favorites.map((joke, index) => (
              <Card key={joke.id} className="mb-3 p-3">
                <Card.Body>
                  <Row>
                    <Col md={10}>
                      {joke.type === 'single' ? (
                        <p className="mb-0">{joke.joke}</p>
                      ) : (
                        <>
                          <p className="mb-1 fw-bold">{joke.setup}</p>
                          <p className="mb-0">{joke.delivery}</p>
                        </>
                      )}
                    </Col>
                    <Col md={2} className="text-end">
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleRemoveFavorite(joke.id)}
                      >
                        Remove
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      )}

      {!currentJoke && !loading && (
        <Row>
          <Col md={8} className="mx-auto">
            <Card className="p-5 text-center bg-light">
              <h4>Click the button to get started! 🚀</h4>
              <p className="text-muted">Select a category and joke type, then click "Get Random Joke"</p>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default JokeGenerator;
