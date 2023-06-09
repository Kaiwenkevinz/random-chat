import renderer from 'react-test-renderer';
import React from 'react';
import UserInfo from '../UserInfo';

describe('测试 UserInfo 组件的 UI', () => {
  it('should 展示所给 user 数据相对应的 user 信息', () => {
    const obj = {
      username: 'Kevin',
      tags: ['tag1', 'tag2', 'tag3'],
      age: 25,
      gender: 'male',
      hometown: 'Mars',
      email: '123@email.com',
      major: 'Nutural Science',
      mbti: 'INTJ',
      birthday: '1996-01-01',
      school: 'Mars University',
      telephoneNumber: '123456789',
    };

    const tree = renderer.create(<UserInfo {...obj} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('当某个信息为空字符或 undefined 时, should not 展示这条信息', () => {
    const emptyTag: string[] = [];
    const emptyHomeTown = '';
    const obj = {
      username: 'Kevin',
      tags: emptyTag,
      age: 25,
      gender: 'male',
      hometown: emptyHomeTown,
      email: '123@email.com',
      major: 'Nutural Science',
      mbti: 'INTJ',
      birthday: '1996-01-01',
      school: 'Mars University',
      telephoneNumber: '123456789',
    };

    const tree = renderer.create(<UserInfo {...obj} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
