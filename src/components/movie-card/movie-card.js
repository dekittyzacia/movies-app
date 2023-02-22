import React, { Component } from 'react'
import { Card, Image, Typography, Tag, Badge, Rate, notification } from 'antd'
import { CheckOutlined, ExclamationOutlined } from '@ant-design/icons'
import { v4 as createKey } from 'uuid'

import Movies from '../../services/movies'
import './movie-card.css'
import { TagConsumer } from '../tag-context/tag-context'
import { ImageSpinner } from '../user-messages/user-messages'

import testimage from './test-image.jpg'

const { Title, Paragraph } = Typography

const getVoteColor = (voteAverage) => {
  if (voteAverage <= 3) return '#E90000'
  if (voteAverage <= 5) return '#E97E00'
  if (voteAverage <= 7) return '#E9D100'
  return '#66E900'
}

export default class MovieCard extends Component {
  movies = new Movies()

  state = {
    ratingValue: 0,
  }

  createTagList = (tagIdsArray, tagNames) => {
    const res = tagIdsArray.map((id) => {
      const tag = tagNames.filter((item) => item.id === id).at(0)
      return tag.name
    })

    const tagList = res.map((item) => {
      return (
        <Tag key={createKey()} className="movie-card__tag tag" color="purple">
          {item}
        </Tag>
      )
    })

    return <div className="movie-card__tag-list tag-list">{tagList}</div>
  }

  onRateMovie = (value, sucsess) => {
    const openNotification = (text) => {
      notification.open({
        message: 'You sent your movie rating!',
        description: text,
        icon: sucsess ? <ExclamationOutlined style={{ color: 'red' }} /> : <CheckOutlined style={{ color: 'green' }} />,
      })
    }

    this.movies
      .rateMovie(this.props.id, value)
      .catch(() => {
        openNotification('Something went wrong, so we can not save your rating', false)
      })
      .then((res) => {
        if (res) {
          this.setState({ ratingValue: value })
          openNotification('Hell yeah! We saved your rating, check the Rating tab!', true)
        }
      })
  }

  render() {
    const { title, releaseDate, description, tagIds, posterPath, voteAverage, rating } = this.props
    const { ratingValue } = this.state

    return (
      <Badge count={voteAverage} color={getVoteColor(voteAverage)} className="movie-card__vote-average vote-average">
        <Card
          hoverable
          className="movie-card"
          cover={
            <Image
              placeholder={<ImageSpinner />}
              src={posterPath ? posterPath : testimage}
              alt={title + ' постер'}
              className="movie-card__poster poster"
              style={{ borderRadius: 8 }}
              preview={false}
            />
          }
        >
          <Title level={5} style={{ marginTop: '0' }} className="movie-card__title title" ellipsis={{ rows: 1 }}>
            {title}
          </Title>
          <Paragraph className="movie-card__date date">{releaseDate}</Paragraph>
          <TagConsumer>{(value) => this.createTagList(tagIds, value)}</TagConsumer>
          <Paragraph className="movie-card__description description">{description}</Paragraph>
          <Rate
            allowHalf
            count={10}
            value={rating ? rating : ratingValue}
            onChange={this.onRateMovie}
            style={{ fontSize: '14px', marginBottom: '0', marginRight: '0' }}
          />
        </Card>
      </Badge>
    )
  }
}
