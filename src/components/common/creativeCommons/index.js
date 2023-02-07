import React from 'react'

import styled from 'styled-components'

const CreativeCommonsWrapper = styled.div`
  color: ${({ theme }) => theme.colors.page[700]};
  font-size: ${({ theme }) => theme.fontSize.sm};
  /* border-top: 1px solid ${({ theme }) => theme.colors.page[100]}; */
  /* border-bottom: 1px solid ${({ theme }) => theme.colors.page[100]}; */
  /* border-radius: ${({ theme }) => theme.borderRadius.sm}; */
  /* padding: ${({ theme }) => theme.padding['1/2']}; */

  padding: ${({ theme }) => theme.padding['1/2']} 0;
  width: fit-content;
  width: 100%;
  margin-bottom: 0 !important;

  span {
    display: flex;
    flex-direction: row;
    grid-gap: ${({ theme }) => theme.padding['1/8']};
    margin-top: ${({ theme }) => theme.margin['1/2']};
    img {
      height: 44px;
      @media (max-width: ${({ theme }) => theme.screens.sm}) {
        height: 24px;
      }
    }
  }
`
const CreativeCommons = () => {
  return (
    <CreativeCommonsWrapper>
      <p xmlnsCc="http://creativecommons.org/ns#">
        This work is licensed under&nbsp;
        <a
          href="http://creativecommons.org/licenses/by-nc-nd/4.0/?ref=chooser-v1"
          target="_blank"
          rel="license noopener noreferrer"
        >
          Attribution-NonCommercial-NoDerivatives 4.0 International
          <span>
            <img
              src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"
              alt="Creative Commons icon"
            />
            <img
              src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"
              alt="Icon - Credit must be given to you, the creator"
            />
            <img
              src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1"
              alt="Icon - Only noncommercial use of your work is permitted"
            />
            <img
              src="https://mirrors.creativecommons.org/presskit/icons/nd.svg?ref=chooser-v1"
              alt="Icon - No derivatives or adaptations of your work are permitted"
            />
          </span>
        </a>
      </p>
    </CreativeCommonsWrapper>
  )
}

export default CreativeCommons
